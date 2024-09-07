// MARK: library imports
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// MARK: ui imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/icons/Menu";
import Icon from "@material-ui/core/Icon";
import HeaderLinks from "./HeaderLinks.jsx";
import AlertDialog from "components/Dialog/AlertDialog.jsx";
import headerStyle from "assets/styles/components/headerStyle.jsx";
// MARK: project imports
import * as actionCreators from "actions/user.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";

// MARK: component

class Header extends React.Component {
  state = {
    confirmDialogOpen: false
  };

  handleLogout = () => {
    this.props.logout();
    this.setState({ open: false });
    this.handleCloseConfirmDialog();
  };

  handleOpenConfirmDialog = () => {
    this.setState(() => ({ confirmDialogOpen: true }));
  };

  handleCloseConfirmDialog = () => {
    this.setState(() => ({ confirmDialogOpen: false }));
  };

  render() {
    const { classes, color } = this.props;
    const appBarClasses = classNames({
      [" " + classes[color]]: color
    });

    return (
      <div>
        <AlertDialog
          open={this.state.confirmDialogOpen}
          title={"Logout"}
          description={"Are you sure you want to log out of your account?"}
          handleConfirm={() => this.handleLogout()}
          handleCancel={() => this.handleCloseConfirmDialog()}
        />
        <AppBar
          id="dashboard-header"
          className={classes.appBar + appBarClasses}
        >
          <Toolbar className={classes.container}>
            <div className={classes.flex} />
            <Hidden smDown implementation="css">
              <HeaderLinks logout={this.handleOpenConfirmDialog} />
            </Hidden>
            <Hidden mdUp implementation="css">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleOpenConfirmDialog}
              >
                <Icon>{"logout"}</Icon>
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.props.handleDrawerToggle}
              >
                <Menu />
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

// MARK: prop type validation

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  logout: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  Header,
  actionCreators,
  function mapStateToProps(state) {
    return {
      user: state.user
    };
  },
  headerStyle
);
