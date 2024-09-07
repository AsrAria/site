import {
  defaultFont,
  container,
  primaryColor
} from "assets/styles/material-dashboard-react.jsx";

const footerStyle = {
  block: {
    color: "inherit",
    padding: "15px",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
    ...defaultFont,
    fontWeight: "500",
    fontSize: "12px"
  },
  left: {
    float: "right !important",
    display: "block"
  },
  right: {
    padding: "15px 35px",
    margin: "0",
    fontSize: "14px",
    float: "left !important"
  },
  footer: {
    bottom: "0",
    borderTop: "1px solid #e7e7e7",
    padding: "15px 0",
    ...defaultFont
  },
  container,
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  }
};
export default footerStyle;
