// MARK: library imports
import React from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";
import Pagination from "material-ui-flat-pagination";
import { toast } from "react-toastify";
// MARK: project imports
import {
  getRequest,
  putRequest,
  postRequest,
  deleteRequest
} from "helper/restHelper.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import PageTable from "components/Pagination/PageTable";
import EditPage from "components/Dialog/EditPage.jsx";
import EditDialog from "components/Dialog/EditDialog.jsx";
import AlertDialog from "components/Dialog/AlertDialog.jsx";
import paginationTableStyle from "assets/styles/components/paginationTableStyle.jsx";

// MARK: component

class PaginationTable extends React.Component {
  constructor(props) {
    super(props);

    this.filter = "";
    this.state = {
      items: [],
      meta: {
        page: 1,
        per_page: this.props.pageSize === null ? 10 : this.props.pageSize
      },
      tableData: [],
      selectedItemId: "",
      selectedItemName: "",
      selectedItemData: {},
      editDialogState: 0,
      deleteConfirmDialogOpen: false,
      isEnableFilterComponent: !this.props.enableDefaultLoad
    };
  }

  getFilter = () => {
    return (
      this.filter +
      (this.props.baseFilter !== undefined && this.props.baseFilter !== null
        ? this.props.baseFilter
        : "")
    );
  };

  // MARK: get

  getPage = (offset = 0) => {
    var url = this.props.baseUrl;
    url +=
      "?per_page=" +
      (this.props.enableSinglePage ? -1 : this.state.meta.per_page);
    if (!this.props.enableSinglePage)
      url += "&page=" + (offset / this.state.meta.per_page + 1).toString();
    url += this.getFilter();

    if (!this.props.enableDefaultLoad && this.filter === "") {
      this.setState({
        tableData: [],
        meta: {
          has_next: false,
          has_prev: false,
          page: 1,
          pages: 1,
          per_page: 10,
          total: 0
        },
        items: []
      });
      return;
    }

    getRequest(
      url,
      data => {
        var index = 1;
        var tableData = [];
        for (var item of data.data.list) {
          tableData.push(this.getRowItems(offset, index, item));
          index += 1;
        }

        if (data.data.meta === undefined) {
          data.data.meta = {
            total: 1,
            page: 1,
            pages: 1,
            per_page: 1,
            has_next: false,
            has_prev: false
          };
        }

        this.setState({
          tableData: tableData,
          meta: data.data.meta,
          items: data.data.list
        });
      },
      error => {
        if (error.response.status === 404 && offset !== 0) {
          this.getPage(0);
          toast.error(
            "The number of items is less than the requested value. You will be automatically returned to the first page."
          );
        }
      },
      true,
      true,
      {
        enable: true
      }
    );
  };

  reload = (isDelete = false) => {
    var offset = (this.state.meta.page - 1) * this.state.meta.per_page;
    if (isDelete) {
      if (offset >= this.state.meta.total - 1) {
        offset -= this.state.meta.per_page;
      }
    }
    this.getPage(Math.max(0, offset));
  };

  getHeadItems = () => {
    var list = [
      {
        name: "#",
        size: "60px"
      }
    ].concat(this.props.tableHead);
    if (this.props.enableDelete)
      list = list.concat({
        name: "Delete",
        size: "30px"
      });
    return list;
  };

  getRowItems = (offset, index, item) => {
    var list = [
      {
        type: "text",
        value: (offset + index).toString()
      }
    ];
    var items = this.props.getItemRow(item);
    for (var i in items) {
      if (items[i].type === "check") {
        items[i].handle = (id, type) => {
          this.changeStateItem(id, type);
        };
      }
    }
    list = list.concat(items);
    if (this.props.enableDelete)
      list = list.concat({
        type: "button",
        icon: "delete",
        color: "error",
        handle: (id, name) => {
          this.handleOpenDeleteConfirmDialog(id, name);
        }
      });
    return list;
  };

  // MARK: crud

  getItem = (id, data) => {
    if (this.props.loadWithoutRequest) {
      var paginationComponent = this;
      setTimeout(function() {
        paginationComponent.handleLoadEditDialog(id, data);
      }, 1000);
    } else {
      getRequest(
        this.props.baseUrl +
          "/" +
          id +
          (this.props.enableFilterForGet ? "?" + this.getFilter() : ""),
        data => {
          this.handleLoadEditDialog(id, data.data);
        }
      );
    }
  };

  deleteItem = id => {
    deleteRequest(this.props.baseUrl + "/" + id, {}, () => {
      this.reload(true);
    });
  };

  createItem = data => {
    postRequest(
      this.props.baseUrl,
      data,
      response => {
        this.reload();
        this.handleCloseEditDialog(true);
        if (!this.props.closeAfterCreate)
          this.handleOpenEditDialog(response.data.id, response.data);
        toast.success("The process was successful.");
      },
      () => {
        this.handleLoadEditDialog(null, null);
      }
    );
  };

  updateItem = (id, data) => {
    putRequest(
      this.props.baseUrl + "/" + id + this.props.editUrlSuffix,
      data,
      response => {
        this.reload();
        this.handleCloseEditDialog(true);
        if (!this.props.closeAfterUpdate)
          this.handleOpenEditDialog(response.data.id, response.data);
        this.props.saveCallBack(id, data);
        toast.success("The process was successful.");
      },
      () => {
        this.handleLoadEditDialog(id, null);
      }
    );
  };

  changeStateItem = (id, type) => {
    postRequest(this.props.baseUrl + "/" + id + "/" + type, {}, () => {
      this.reload();
      toast.success("The process was successful.");
    });
  };

  // MARK: handlers

  handlePageChange = offset => {
    this.getPage(offset);
  };

  handleOpenEditDialog = (id, data) => {
    this.getItem(id, data);
    this.setState(() => ({
      editDialogState: 1,
      selectedItemId: id
    }));
  };

  handleLoadEditDialog = (id, data) => {
    this.setState(() => ({
      editDialogState: 2,
      selectedItemId: id,
      selectedItemData: data
    }));
  };

  handleSendEditDialog = (id, data) => {
    if (id === null || id === "") {
      this.createItem(data);
    } else {
      this.updateItem(id, data);
    }
    this.setState(() => ({
      editDialogState: 3
    }));
  };

  handleCloseEditDialog = (isForce = false) => {
    if (
      !isForce &&
      (this.state.editDialogState === 1 || this.state.editDialogState === 3)
    ) {
      return;
    }
    this.setState(() => ({
      editDialogState: 0
    }));
  };

  handleOpenDeleteConfirmDialog = (id, name) => {
    this.setState(() => ({
      deleteConfirmDialogOpen: true,
      selectedItemId: id,
      selectedItemName: name
    }));
  };

  handleCloseDeleteConfirmDialog = () => {
    this.setState(() => ({
      deleteConfirmDialogOpen: false
    }));
  };

  // MARK: ui functions

  componentDidMount() {
    this.reload();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AlertDialog
          open={this.state.deleteConfirmDialogOpen}
          title={"Delete"}
          description={`Are you sure you want to delete "${
            this.state.selectedItemName
          }"?`}
          handleConfirm={() => {
            this.handleCloseDeleteConfirmDialog();
            this.deleteItem(this.state.selectedItemId);
          }}
          handleCancel={() => this.handleCloseDeleteConfirmDialog()}
        />
        {this.props.addDialog != null &&
        (this.state.selectedItemId === "" ||
          this.state.selectedItemId === null ||
          this.state.selectedItemId === undefined) ? (
          this.props.editType !== "dialog" ? (
            <EditPage
              state={this.state.editDialogState}
              itemId={this.state.selectedItemId}
              itemData={this.state.selectedItemData}
              handleSubmit={(id, data) => {
                this.handleSendEditDialog(id, data);
              }}
              handleReload={() =>
                this.handleOpenEditDialog(
                  this.state.selectedItemId,
                  this.state.selectedItemData
                )
              }
              handleReloadPage={() => this.reload()}
              handleCancel={() => this.handleCloseEditDialog()}
              editDialog={this.props.addDialog}
              enableEdit={true}
              baseUrl={this.props.baseUrl}
              baseFilter={this.getFilter()}
            />
          ) : (
            <EditDialog
              state={this.state.editDialogState}
              itemId={this.state.selectedItemId}
              itemData={this.state.selectedItemData}
              handleSubmit={(id, data) => {
                this.handleSendEditDialog(id, data);
              }}
              handleReload={() =>
                this.handleOpenEditDialog(
                  this.state.selectedItemId,
                  this.state.selectedItemData
                )
              }
              handleReloadPage={() => this.reload()}
              handleCancel={() => this.handleCloseEditDialog()}
              editDialog={this.props.addDialog}
              enableEdit={true}
              baseUrl={this.props.baseUrl}
              baseFilter={this.getFilter()}
            />
          )
        ) : this.props.editDialog != null ? (
          this.props.editType !== "dialog" ? (
            <EditPage
              state={this.state.editDialogState}
              itemId={this.state.selectedItemId}
              itemData={this.state.selectedItemData}
              handleSubmit={(id, data) => {
                this.handleSendEditDialog(id, data);
              }}
              handleReload={() =>
                this.handleOpenEditDialog(
                  this.state.selectedItemId,
                  this.state.selectedItemData
                )
              }
              handleReloadPage={() => this.reload()}
              handleCancel={() => this.handleCloseEditDialog()}
              editDialog={this.props.editDialog}
              enableEdit={
                this.props.enableEdit ||
                (this.props.enableAdd &&
                  (this.state.selectedItemId === "" ||
                    this.state.selectedItemId === undefined))
              }
              baseUrl={this.props.baseUrl}
              baseFilter={this.getFilter()}
            />
          ) : (
            <EditDialog
              state={this.state.editDialogState}
              itemId={this.state.selectedItemId}
              itemData={this.state.selectedItemData}
              handleSubmit={(id, data) => {
                this.handleSendEditDialog(id, data);
              }}
              handleReload={() =>
                this.handleOpenEditDialog(
                  this.state.selectedItemId,
                  this.state.selectedItemData
                )
              }
              handleReloadPage={() => this.reload()}
              handleCancel={() => this.handleCloseEditDialog()}
              editDialog={this.props.editDialog}
              enableEdit={
                this.props.enableEdit ||
                (this.props.enableAdd &&
                  (this.state.selectedItemId === "" ||
                    this.state.selectedItemId === undefined))
              }
              baseUrl={this.props.baseUrl}
              baseFilter={this.getFilter()}
            />
          )
        ) : null}
        {this.props.editType === "dialog" || !this.state.editDialogState ? (
          <GridContainer justify="center">
            <GridItem
              xs={this.props.tableSize[2]}
              sm={this.props.tableSize[1]}
              md={this.props.tableSize[0]}
            >
              <Card className={classes.mainCard}>
                <CardHeader color="primary">
                  <div>
                    <div className={classes.cardTitleWhite}>
                      {this.props.title}
                    </div>
                    {this.props.enableAdd ? (
                      <Button
                        className={classes.submitButton}
                        onClick={() => this.handleLoadEditDialog("", {})}
                        color="warning"
                      >
                        Add
                      </Button>
                    ) : null}
                    {this.props.filterComponent != null ? (
                      <Button
                        className={classes.submitButton}
                        onClick={() => {
                          this.setState({
                            isEnableFilterComponent: !this.state
                              .isEnableFilterComponent
                          });
                        }}
                        color="warning"
                      >
                        Filter
                      </Button>
                    ) : null}
                    {this.props.app.loading > 0 ? (
                      <ReactLoading
                        className={classes.loadingItem}
                        type={"spin"}
                        height={30}
                        width={30}
                      />
                    ) : null}
                  </div>
                </CardHeader>
                {this.props.filterComponent != null &&
                this.state.isEnableFilterComponent ? (
                  <CardBody className={classes.filterView}>
                    {React.createElement(this.props.filterComponent, {
                      updateFilter: filter => {
                        this.filter = filter;
                        this.reload();
                      }
                    })}
                  </CardBody>
                ) : null}
                <CardBody className={classes.tableView}>
                  <PageTable
                    tableHeaderColor="primary"
                    tableHead={this.getHeadItems()}
                    items={this.state.items}
                    getItemId={this.props.getItemId}
                    getItemName={this.props.getItemName}
                    tableData={this.state.tableData}
                    enableEdit={this.props.enableEdit}
                    enableDelete={this.props.enableDelete}
                    handleSelect={(id, name, data) => {
                      if (this.props.handleSelect != null)
                        this.props.handleSelect(id, name, data);
                      else if (this.props.editDialog != null)
                        this.handleOpenEditDialog(id, data);
                    }}
                  />
                  {this.state.meta.page === null ? null : (
                    <ListItem className={classes.pagination}>
                      {!this.props.enableSinglePage ? (
                        <Pagination
                          size={"large"}
                          className={classes.paginationBox}
                          limit={this.state.meta.per_page}
                          offset={
                            (this.state.meta.page - 1) *
                            this.state.meta.per_page
                          }
                          total={this.state.meta.total}
                          nextPageLabel=""
                          previousPageLabel=""
                          onClick={(e, offset) => this.handlePageChange(offset)}
                        />
                      ) : null}
                      {!this.props.enableSinglePage &&
                      this.props.pageSize === null ? (
                        <div className={classes.pageSizeInput}>
                          <CustomSelect
                            value={
                              this.state.meta.per_page === 20
                                ? 1
                                : this.state.meta.per_page === 50
                                  ? 2
                                  : 0
                            }
                            id={"item_count"}
                            formControlProps={{
                              disabled: false,
                              fullWidth: false
                            }}
                            inputProps={{
                              onChange: e => {
                                var state = this.state.meta;
                                state.per_page = [10, 20, 50][e.target.value];
                                this.setState({
                                  meta: state
                                });
                                this.getPage(0);
                              }
                            }}
                            items={[10, 20, 50]}
                          />
                        </div>
                      ) : null}
                    </ListItem>
                  )}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        ) : null}
      </div>
    );
  }
}

// MARK: prop type validation

PaginationTable.defaultProps = {
  saveCallBack: () => {},
  pageSize: 10,
  baseFilter: "",
  enableFilterForGet: false,
  editDialog: null,
  handleSelect: null,
  filterComponent: null,
  editType: "dialog",
  closeAfterCreate: true,
  closeAfterUpdate: true,
  editUrlSuffix: "",
  enableDefaultLoad: true,
  loadWithoutRequest: false
};

PaginationTable.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  baseFilter: PropTypes.string.isRequired,
  enableFilterForGet: PropTypes.bool.isRequired,
  pageSize: PropTypes.number,
  tableSize: PropTypes.array.isRequired,
  tableHead: PropTypes.array.isRequired,
  getItemId: PropTypes.func.isRequired,
  getItemRow: PropTypes.func.isRequired,
  getItemName: PropTypes.func.isRequired,
  addDialog: PropTypes.object,
  enableAdd: PropTypes.bool.isRequired,
  editDialog: PropTypes.object,
  enableEdit: PropTypes.bool.isRequired,
  editUrlSuffix: PropTypes.string.isRequired,
  editType: PropTypes.string.isRequired,
  enableDelete: PropTypes.bool.isRequired,
  saveCallBack: PropTypes.func.isRequired,
  closeAfterCreate: PropTypes.bool.isRequired,
  closeAfterUpdate: PropTypes.bool.isRequired,
  enableSinglePage: PropTypes.bool,
  enableDefaultLoad: PropTypes.bool,
  loadWithoutRequest: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func,
  filterComponent: PropTypes.object
};

// MARK: export

export default connectComponentWithStyle(
  PaginationTable,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  paginationTableStyle
);
