// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import Icon from "@material-ui/core/Icon";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import pageTableStyle from "assets/styles/components/pageTableStyle.jsx";

class PageTable extends React.Component {
  constructor(props) {
    super(props);

    this.classes = props.classes;
  }

  render() {
    return (
      <div className={this.classes.tableResponsive}>
        <Table className={this.classes.table}>
          <TableHead className={this.classes.primaryTableHeader}>
            <TableRow>
              {this.props.tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={
                      this.classes.tableCell + " " + this.classes.tableHeadCell
                    }
                    key={key}
                    width={prop.size}
                  >
                    <div className={this.classes.textCell}>{prop.name}</div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.tableData.map((prop, key) => {
              return (
                <TableRow
                  className={this.classes.tableRow}
                  key={key}
                  onClick={() =>
                    this.props.handleSelect(
                      this.props.getItemId(this.props.items[key]),
                      this.props.getItemName(this.props.items[key]),
                      this.props.items[key]
                    )
                  }
                >
                  {prop.map((prop, key2) => {
                    return {
                      // eslint-disable-next-line
                      ["text"]: (
                        <TableCell
                          className={this.classes.tableCell}
                          key={key2}
                        >
                          <div className={this.classes.textCell}>
                            {prop.value}
                          </div>
                        </TableCell>
                      ),
                      // eslint-disable-next-line
                      ["button"]: (
                        <TableCell
                          className={this.classes.tableCell}
                          key={key2}
                        >
                          <Button
                            key={key2}
                            className={this.classes.deleteButton}
                            aria-label="Delete"
                            onClick={e => {
                              e.stopPropagation();
                              prop.handle(
                                this.props.getItemId(this.props.items[key]),
                                this.props.getItemName(this.props.items[key])
                              );
                            }}
                          >
                            <Icon color={prop.color}>{prop.icon}</Icon>
                          </Button>
                        </TableCell>
                      ),
                      // eslint-disable-next-line
                      ["check"]: (
                        <TableCell
                          className={this.classes.tableCell}
                          key={key2}
                        >
                          <Checkbox
                            checked={prop.value}
                            disabled={!prop.enable}
                            onClick={e => {
                              e.stopPropagation();
                              if (prop.value === true)
                                prop.handle(
                                  this.props.getItemId(this.props.items[key]),
                                  prop.actionDisable
                                );
                              else
                                prop.handle(
                                  this.props.getItemId(this.props.items[key]),
                                  prop.actionEnable
                                );
                            }}
                            icon={
                              <Check className={this.classes.uncheckedIcon} />
                            }
                            checkedIcon={
                              <Check className={this.classes.checkedIcon} />
                            }
                          />
                        </TableCell>
                      ),
                      // eslint-disable-next-line
                      ["link"]: (
                        <TableCell
                          className={this.classes.tableCell}
                          key={key2}
                          onClick={e => {
                            e.stopPropagation();
                          }}
                        >
                          <a className={this.classes.linkCell} href={prop.link}>
                            {prop.title}
                          </a>
                        </TableCell>
                      ),
                      // eslint-disable-next-line
                      ["component"]: (
                        <TableCell
                          className={this.classes.tableCell}
                          key={key2}
                          onClick={e => {
                            e.stopPropagation();
                          }}
                        >
                          {prop.createComponent !== undefined
                            ? prop.createComponent()
                            : null}
                        </TableCell>
                      )
                    }[prop.type];
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

// MARK: prop type validation

PageTable.defaultProps = {
  items: [],
  tableData: [],
  tableHead: []
};

PageTable.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
  tableHead: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  getItemId: PropTypes.func.isRequired,
  getItemName: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

// MARK: exports

export default withStyles(pageTableStyle)(PageTable);
