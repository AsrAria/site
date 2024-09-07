// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  LineChart,
  CartesianGrid,
  XAxis,
  Bar,
  Line,
  ResponsiveContainer,
  LabelList,
  Legend,
  Tooltip
} from "recharts";
// MARK: ui imports
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import testResultStyle from "assets/styles/components/testResultStyle.jsx";

// MARK: component

class TestResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: this.props.tab
    };
  }

  createFullTable = () => {
    const { classes } = this.props;

    let tableHead = [
      "",
      "Raw Score",
      "BR from table",
      "BR X Cor.",
      "BR 1/2X Cor.",
      "BR DA Adj.",
      "BR DD Adj.",
      "BR DC Adj.",
      "BR Inp Adj.",
      "Final BR",
      ""
    ];

    let tableData = [];
    for (let item of this.props.data.result.items) {
      tableData.push([
        item.r,
        item.w,
        item.rawbr,
        item.aftercor,
        item.afterhcor,
        item.dabr,
        item.afterddcor,
        item.afterdccor,
        item.afterinp,
        item.final_br,
        item.gg
      ]);
    }

    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes.tableHeader}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + " " + classes.tableHeadCell
                      }
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop, key) => {
              return (
                <TableRow key={key}>
                  {prop.map((prop, key2) => {
                    return (
                      <TableCell
                        className={classes.tableCell}
                        style={{
                          color:
                            key2 === 0 || key2 === 9
                              ? this.props.data.result.items[key].state === 0
                                ? "black"
                                : this.props.data.result.items[key].state === 1
                                  ? "orange"
                                  : "red"
                              : "black"
                        }}
                        key={key2}
                      >
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  createReportTable = () => {
    const { classes } = this.props;

    let tableHead = ["Disorder", "Your rate"];

    let tableData = [];
    for (let item of this.props.data.result.items) {
      if (item.state === 2) {
        tableData.push([item.r, item.final_br]);
      }
    }

    tableData.sort(function(a, b) {
      return b[1] - a[1];
    });

    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes.tableHeader}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + " " + classes.tableHeadCell
                      }
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop, key) => {
              return (
                <TableRow key={key}>
                  {prop.map((prop, key2) => {
                    return (
                      <TableCell className={classes.tableCell} key={key2}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className={classes.tableDescription}>
          {"Table Description:"}
          <br />
          {"Rate >= 80 -> Treatment"}
          <br />
          {"Rate >= 90 -> Danger zone"}
          <br />
          {"Rate >= 120 -> Disorder"}
        </div>
      </div>
    );
  };

  createBarChart = () => {
    const { classes } = this.props;

    let tableData = [];
    for (let item of this.props.data.result.items) {
      if (item.state === 2) {
        tableData.push(item);
      }
    }

    return (
      <div className={classes.barChartBox}>
        <ResponsiveContainer>
          <BarChart
            height={1000}
            data={tableData}
            barSize={20}
            margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="category" dataKey="name" />
            <Bar dataKey="final_br" fill="#8884d8">
              <LabelList dataKey="final_br" position="top" fill="#666666" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  createLineChart = () => {
    const { classes } = this.props;

    let tableData = [];
    for (let item of this.props.data.result.items) {
      if (item.state === 2) {
        tableData.push(item.name);
      }
    }

    return (
      <div className={classes.barChartBox}>
        <ResponsiveContainer>
          <LineChart
            width={730}
            height={250}
            data={this.props.data.history}
            margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <Tooltip />
            <Legend />
            {tableData.map((prop, key) => {
              return (
                <Line
                  type="monotone"
                  dataKey={prop}
                  stroke={
                    [
                      "#546E7A",
                      "#039BE5",
                      "#e53935",
                      "#3949AB",
                      "#FDD835",
                      "#FB8C00",
                      "#F4511E",
                      "#FFB300",
                      "#6D4C41",
                      "#00897B",
                      "#8E24AA",
                      "#757575",
                      "#5E35B1",
                      "#00ACC1",
                      "#C0CA33",
                      "#7CB342",
                      "#1E88E5",
                      "#43A047",
                      "#D81B60"
                    ][key % 18]
                  }
                  key={key}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainBox}>
        <Tabs
          value={this.state.tab}
          onChange={(e, value) => {
            var state = { tab: value };
            this.setState(() => state);
          }}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab classes={{ root: classes.tab }} label={"Table"} />
          <Tab classes={{ root: classes.tab }} label={"Chart"} />
        </Tabs>

        {this.state.tab === 1 ? (
          <div className={classes.tableBox}>
            {this.createBarChart()}
            <br />
            {this.createLineChart()}
          </div>
        ) : (
          <div className={classes.tableBox}>
            {this.createReportTable()}
            <br />
            {this.createFullTable()}
          </div>
        )}
      </div>
    );
  }
}

// MARK: prop type validation

TestResult.defaultProps = {
  tab: 0
};

TestResult.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  tab: PropTypes.number.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  TestResult,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  testResultStyle
);
