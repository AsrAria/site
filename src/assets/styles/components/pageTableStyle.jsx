import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "assets/styles/material-dashboard-react.jsx";

const pageTableStyle = () => ({
  warningTableHeader: {
    color: warningColor
  },
  primaryTableHeader: {
    color: primaryColor
  },
  dangerTableHeader: {
    color: dangerColor
  },
  successTableHeader: {
    color: successColor
  },
  infoTableHeader: {
    color: infoColor
  },
  roseTableHeader: {
    color: roseColor
  },
  grayTableHeader: {
    color: grayColor
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
    fontSize: "1em"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "0px 0px",
    verticalAlign: "middle",
    textAlign: "center"
  },
  tableResponsive: {
    width: "100%",
    overflowX: "auto"
  },
  editButton: {
    minWidth: "40px",
    padding: "5px",
    color: primaryColor
  },
  imageButton: {
    minWidth: "40px",
    padding: "5px"
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  tableRow: {
    cursor: "pointer"
  },
  linkCell: {
    color: "#0000FF",
    "&:hover": {
      color: "#0000FF"
    }
  },
  textCell: {
    paddingTop: "15px",
    paddingBottom: "15px"
  }
});

export default pageTableStyle;
