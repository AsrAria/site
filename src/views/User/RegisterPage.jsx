// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { css } from "glamor";
// MARK: ui import
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
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

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      role: 0,
      email: "",
      password: "",
      retryPassword: ""
    };
  }

  register = () => {
    const { role, email, password, retryPassword } = this.state;
    if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$/.test(email)) {
      toast.error("Email format is incorrect.");
      return;
    }
    if (password !== retryPassword) {
      toast.error("The new password and its repetition are not equal.");
      return;
    }
    this.props.register(role, email, password);
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
              <div className={classes.cardTitleWhite}>Register</div>
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
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomSelect
                  value={this.state.role}
                  id={"role"}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => {
                      this.onChangeHandler(e, "role");
                    }
                  }}
                  items={["Person", "Psychiatrist", "Organization"]}
                />
              </GridItem>
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
                  onEnter={this.register}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => {
                      this.onChangeHandler(e, "password");
                    },
                    type: "password"
                  }}
                  onEnter={this.register}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Repeat the password"
                  id="retryPassword"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => {
                      this.onChangeHandler(e, "retryPassword");
                    },
                    type: "password"
                  }}
                  onEnter={this.register}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter justify="left">
            <div className={classes.bottomOptions}>
              <Button
                className={classes.submitButton}
                color="primary"
                onClick={this.register}
              >
                Register
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

RegisterPage.defaultProps = {
  app: {
    loading: 0
  },
  user: {
    accessToken: ""
  },
  classes: {},
  location: {},
  register: () => {}
};

RegisterPage.propTypes = {
  app: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  RegisterPage,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  loginStyle
);
