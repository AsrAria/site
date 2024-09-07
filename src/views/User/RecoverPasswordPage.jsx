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

class RecoverPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  recoverPassword = () => {
    const { email } = this.state;
    this.props.recoverPassword(email);
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
      this.props.user.activateTTL !== null &&
      this.props.user.activateTTL.getTime() - new Date().getTime() >= 0
    ) {
      return <Redirect to={"/activate"} />;
    }

    if (this.props.user.accessToken.length > 0) {
      return <Redirect to={from} />;
    }

    return (
      <div className={classes.background}>
        <Card className={classes.mainBox}>
          <CardHeader color="primary">
            <div>
              <div className={classes.cardTitleWhite}>Recover</div>
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
            Enter your email. A password change link will be sent to you.
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => {
                      this.onChangeHandler(e, "email");
                    }
                  }}
                  onEnter={this.recoverPassword}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter justify="left">
            <div className={classes.bottomOptions}>
              <Button
                className={classes.submitButton}
                color="primary"
                onClick={this.recoverPassword}
              >
                Submit
              </Button>
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

RecoverPasswordPage.defaultProps = {
  app: {
    loading: 0
  },
  user: {
    accessToken: ""
  },
  classes: {},
  location: {},
  recoverPassword: () => {}
};

RecoverPasswordPage.propTypes = {
  app: PropTypes.object.isRequired,
  recoverPassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  RecoverPasswordPage,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  loginStyle
);
