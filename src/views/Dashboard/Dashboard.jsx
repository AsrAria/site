// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { css } from "glamor";
// MARK: project imports
import * as actionCreators from "actions/user.js";
import { dashboardTable, dashboardRoutes } from "routes/dashboard.jsx";
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import dashboardStyle from "assets/styles/views/dashboardStyle.jsx";
import image from "assets/img/image_sidebar.jpg";
import icon from "assets/img/icon.png";

// MARK: component

const switchRoutes = user => {
  return (
    <Switch>
      {dashboardRoutes(user).map((prop, key) => {
        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.to} key={key} />;
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  );
};

// MARK: component

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false
    };

    this.resizeFunction = this.resizeFunction.bind(this);

    this.props.getProfile(
      this.props.user.profile.role,
      this.props.user.profile.id
    );
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <div className={classes.wrapper}>
          <Sidebar
            routes={dashboardTable(this.props.user)}
            logoText={"Psykon"}
            logo={icon}
            image={image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color="blue"
            {...rest}
          />
          <div className={classes.mainPanel} ref="mainPanel">
            <Header
              routes={dashboardRoutes(this.props.user)}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
            />
            <div className={classes.content}>
              <div className={classes.container}>
                {switchRoutes(this.props.user)}
              </div>
            </div>
            <Footer />
          </div>
        </div>
        <ToastContainer
          toastClassName={css({
            fontSize: "14px",
            paddingLeft: "15px",
            paddingBottom: "15px"
          })}
        />
      </div>
    );
  }
}

// MARK: prop type validation

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  Dashboard,
  actionCreators,
  function mapStateToProps(state) {
    return {
      user: state.user
    };
  },
  dashboardStyle
);
