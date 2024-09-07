import {
  primaryColor,
  defaultFont
} from "assets/styles/material-dashboard-react.jsx";

const testResultStyle = () => ({
  mainBox: {
    width: "100%"
  },
  tableBox: {
    width: "100%"
  },
  tableHeader: {
    color: primaryColor
  },
  tableDescription: {
    padding: "10px",
    marginTop: "10px",
    fontSize: "13px",
    border: "1px solid rgba(0, 0, 0, .18)",
    borderRadius: "3px"
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    fontSize: "16px",
    paddingLeft: "5px !important",
    paddingRight: "5px !important"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "7px 0px",
    verticalAlign: "middle",
    textAlign: "center"
  },
  tableResponsive: {
    width: "100%",
    overflowX: "auto"
  },
  barChartBox: {
    width: "100%",
    height: "500px"
  }
});

export default testResultStyle;
