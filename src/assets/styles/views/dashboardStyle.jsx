import {
  drawerWidth,
  transition,
  container
} from "assets/styles/material-dashboard-react.jsx";

const dashboardStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "10px",
    padding: "0px 10px 10px 10px",
    minHeight: "calc(100vh - 175px)"
  },
  container,
  map: {
    marginTop: "20px"
  }
});

export default dashboardStyle;
