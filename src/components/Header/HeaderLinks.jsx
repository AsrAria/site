// MARK: library imports
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// MARK: ui imports
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Person from "@material-ui/icons/Person";
import Button from "components/CustomButtons/Button.jsx";
import headerLinksStyle from "assets/styles/components/headerLinksStyle.jsx";
// MARK: project imports
import { redirectTo } from "helper/redirectHelper.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleOpenUpdateProfile = () => {
    redirectTo("updateProfile");
    this.setState({ open: false });
  };

  handleOpenChangePassword = () => {
    redirectTo("changePassword");
    this.setState({ open: false });
  };

  handleOpenIncreaseBalance = () => {
    redirectTo("increaseBalance");
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div>
        <div className={classes.manager}>
          <Button
            color="transparent"
            href="#"
            className={classes.title}
            onClick={this.handleOpenUpdateProfile}
          >
            {this.props.user.accessToken.length > 0 ? (
              <div>{this.props.user.profile.name}</div>
            ) : null}
          </Button>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={classes.buttonLink}
          >
            <Person className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p onClick={this.handleClick} className={classes.linkText}>
                Notification
              </p>
            </Hidden>
          </Button>
          <Poppers
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleOpenChangePassword}
                        className={
                          classes.dropdownItem + " " + classes.textRight
                        }
                      >
                        Change password
                      </MenuItem>
                      {this.props.user.profile.role === 0 ? (
                        <MenuItem
                          onClick={this.handleOpenIncreaseBalance}
                          className={
                            classes.dropdownItem + " " + classes.textRight
                          }
                        >
                          Increase balance
                        </MenuItem>
                      ) : null}
                      <MenuItem
                        onClick={this.handleOpenUpdateProfile}
                        className={
                          classes.dropdownItem + " " + classes.textRight
                        }
                      >
                        Edit account
                      </MenuItem>
                      <MenuItem
                        onClick={this.props.logout}
                        className={
                          classes.dropdownItem + " " + classes.textRight
                        }
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    );
  }
}

// MARK: prop type validation

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  HeaderLinks,
  [],
  function mapStateToProps(state) {
    return {
      user: state.user
    };
  },
  headerLinksStyle
);
