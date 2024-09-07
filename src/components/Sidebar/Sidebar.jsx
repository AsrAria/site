// MARK: library imports
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// MARK: ui imports
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import sidebarStyle from "assets/styles/components/sidebarStyle.jsx";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: 0
    };
  }

  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  };

  handleClick = key => {
    if (this.state.open === key) this.setState(() => ({ open: -1 }));
    else this.setState(() => ({ open: key }));
  };

  render() {
    const { classes, color, logo, image, logoText, routes } = this.props;

    var brand = (
      <div className={classes.logo}>
        <a href="/" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          <div className={classes.logoText}>{logoText}</div>
        </a>
      </div>
    );

    function createLink(activeRoute, item, key) {
      const listItemClasses = classNames({
        [" " + classes[color]]: activeRoute(item.path)
      });
      const whiteFontClasses = classNames({
        [" " + classes.whiteFont]: activeRoute(item.path)
      });
      return (
        <NavLink
          key={key}
          to={item.path}
          className={classes.item}
          activeClassName="active"
        >
          <ListItem button className={classes.itemLink + listItemClasses}>
            <ListItem className={classes.itemIcon + whiteFontClasses}>
              {typeof item.icon === "string" ? (
                <Icon>{item.icon}</Icon>
              ) : (
                <item.icon />
              )}
            </ListItem>
            <ListItemText
              primary={item.name}
              className={classes.itemText + whiteFontClasses}
              disableTypography={true}
            />
          </ListItem>
        </NavLink>
      );
    }

    var links = (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          if (prop.length > 1) {
            return (
              <List component="nav" key={key * 2}>
                <ListItem
                  button
                  onClick={() => this.handleClick(key)}
                  className={classes.itemLink}
                >
                  <ListItem
                    className={classes.itemIcon + " " + classes.whiteFont}
                  >
                    {this.state.open === key ? (
                      <ExpandLess className={classes.whiteFont} />
                    ) : typeof prop[0].icon === "string" ? (
                      <Icon>{prop[0].icon}</Icon>
                    ) : (
                      <item.icon />
                    )}
                  </ListItem>
                  <ListItemText
                    primary={prop[0].name}
                    className={
                      classes.collapseItemText + " " + classes.whiteFont
                    }
                    disableTypography={true}
                  />
                </ListItem>
                <Collapse
                  className={classes.collapseItem}
                  in={this.state.open === key}
                  timeout="auto"
                  unmountOnExit
                  key={key * 2 + 1}
                >
                  <List className={classes.list}>
                    {prop.map((prop, key2) => {
                      if (prop.redirect || !prop.visible) return null;
                      return createLink(
                        this.activeRoute,
                        prop,
                        key * 100 + key2
                      );
                    })}
                  </List>
                </Collapse>
              </List>
            );
          } else {
            var item = prop[0];
            if (item.redirect || !item.visible) return null;
            return createLink(this.activeRoute, item, key * 2);
          }
        })}
      </List>
    );

    return (
      <div>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.props.open}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
