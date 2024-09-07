// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { css } from "glamor";
// MARK: ui import
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import loginStyle from "assets/styles/views/loginStyle.jsx";
// MARK: project imports
import * as actionCreators from "actions/user.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";

// MARK: component

class ActivatePage extends React.Component {
  intervalID = 0;

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      activateCode: ""
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState({
        currentTime: new Date().toLocaleString()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  activate = () => {
    const { activateCode } = this.state;
    this.props.activate(this.props.user.email, activateCode);
  };

  onChangeHandler = (e, name) => {
    let updateState = {};
    updateState[name] = e.target.value;
    this.setState(updateState);
  };

  render() {
    const { classes } = this.props;

    const { from } = this.props.location.state || {
      from: { pathname: "/" }
    };

    if (
      this.props.user.email === "" ||
      this.props.user.activateTTL === null ||
      this.props.user.activateTTL.getTime() - new Date().getTime() < 0
    ) {
      this.props.logout();
    }

    if (this.props.user.accessToken.length > 0) {
      return <Redirect to={from} />;
    }

    return (
      <div className={classes.background}>
        <Card className={classes.mainBox}>
          <CardHeader color="primary">
            <div>
              <div className={classes.cardTitleWhite}>Activate</div>
              {this.props.app.loading > 0 ? (
                <ReactLoading
                  className={classes.loadingItem}
                  type={"spin"}
                  height={30}
                  width={30}
                />
              ) : null}
            </div>
          </CardHeader>
          <CardBody>
            Click{" "}
            <b onClick={this.props.logout} className={classes.logoutButton}>
              here
            </b>{" "}
            to log in with another email.
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Activation code"
                  id="activateCode"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "tel",
                    autoComplete: "one-time-code",
                    onChange: e => {
                      this.onChangeHandler(e, "activateCode");
                    }
                  }}
                  onEnter={this.activate}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter justify="left">
            <div className={classes.bottomOptions}>
              <Button
                className={classes.submitButton}
                color="primary"
                onClick={this.activate}
              >
                Login
              </Button>
              <p className={classes.remainingTitle}>
                Remaining time:‌{" "}
                {parseInt(
                  Math.max(
                    0,
                    this.props.user.activateTTL.getTime() - new Date().getTime()
                  ) /
                    60 /
                    1000
                )}
                :
                {parseInt(
                  Math.max(
                    ((this.props.user.activateTTL.getTime() -
                      new Date().getTime()) /
                      1000) %
                      60
                  )
                )}
              </p>
            </div>
          </CardFooter>
        </Card>
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

ActivatePage.defaultProps = {
  app: {
    loading: 0
  },
  user: {
    accessToken: ""
  },
  classes: {},
  location: {},
  login: () => {}
};

ActivatePage.propTypes = {
  app: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  activate: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  ActivatePage,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  loginStyle
);
