// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import Dialog from "@material-ui/core/Dialog";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import BaseFilter from "components/Base/BaseFilter.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
import selectDialogStyle from "assets/styles/components/selectDialogStyle.jsx";

// MARK: component

class SelectDialog extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Dialog open={this.props.open} onClose={() => this.props.handleCancel()}>
        <CardFooter>
          <div className={classes.mainView}>
            <Pagination
              tableSize={[12, 12, 12]}
              title={this.props.title}
              baseUrl={this.props.baseUrl}
              baseFilter={this.props.baseFilter}
              tableHead={this.props.getHeader()}
              getItemId={item => {
                return item.id;
              }}
              getItemName={item => {
                return item.name;
              }}
              getItemRow={item => {
                return this.props.getItemRow(item);
              }}
              pageSize={5}
              enableAdd={false}
              enableEdit={false}
              enableDelete={false}
              handleSelect={(id, name, data) => {
                this.props.handleSelect(
                  id,
                  this.props.getItemRow(data)[0].value,
                  data
                );
              }}
              filterComponent={
                this.props.filterComponent !== undefined
                  ? this.props.filterComponent
                  : BaseFilter
              }
              enableDefaultLoad={true}
            />
          </div>
        </CardFooter>
      </Dialog>
    );
  }
}

// MARK: prop type validation

SelectDialog.defaultProps = {
  open: false,
  title: "",
  baseUrl: "",
  baseFilter: "",
  filterComponent: BaseFilter,
  getHeader: () => {
    return [
      {
        name: "Name",
        size: null
      }
    ];
  },
  getItemRow: item => {
    return [
      {
        type: "text",
        value: item.name
      }
    ];
  },
  handleSelect: () => {},
  handleCancel: () => {}
};

SelectDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  baseUrl: PropTypes.string.isRequired,
  baseFilter: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  getHeader: PropTypes.func.isRequired,
  getItemRow: PropTypes.func.isRequired,
  filterComponent: PropTypes.func
};

// MARK: export

export default connectComponentWithStyle(
  SelectDialog,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  selectDialogStyle
);
