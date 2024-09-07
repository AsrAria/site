import {
  roseColor,
  successColor
} from "assets/styles/material-dashboard-react.jsx";

const draggableListStyle = () => ({
  chipBox: {
    width: "calc(100% - 10px)",
    padding: "5px",
    minHeight: "37px",
    textAlign: "left"
  },
  chipItem: {
    margin: "5px",
    paddingLeft: "15px",
    paddingRight: "10px",
    borderRadius: "5px",
    direction: "rtl",
    background: roseColor,
    color: "white",
    "&:focus": {
      background: roseColor
    }
  },
  chipItemSelected: {
    margin: "5px",
    paddingLeft: "15px",
    paddingRight: "10px",
    borderRadius: "5px",
    direction: "rtl",
    background: successColor,
    color: "white",
    "&:focus": {
      background: successColor
    }
  }
});

export default draggableListStyle;
