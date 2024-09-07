// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
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

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: "",
      newPassword: "",
      retryNewPassword: ""
    };
  }

  changePassword = () => {
    const { oldPassword, newPassword, retryNewPassword } = this.state;
    if (newPassword !== retryNewPassword) {
      toast.error("The new password and its repetition are not equal.");
      return;
    }
    this.props.changePassword(oldPassword, newPassword);
  };

  onChangeHandler = (e, name) => {
    let updateState = {};
    updateState[name] = e.target.value;
    this.setState(updateState);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer justify="center">
          <GridItem style={{ marginTop: "5vh" }} xs={12} sm={8} md={6}>
            <Card>
              <CardHeader color="primary">
                <div>
                  <div className={classes.cardTitleWhite}>Edit password</div>
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
                    <CustomInput
                      labelText="Previous password"
                      id="oldPassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "oldPassword");
                        },
                        type: "password"
                      }}
                      onEnter={this.changePassword}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="New password"
                      id="newPassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "newPassword");
                        },
                        type: "password"
                      }}
                      onEnter={this.changePassword}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Repeat the new password"
                      id="retryNewPassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "retryNewPassword");
                        },
                        type: "password"
                      }}
                      onEnter={this.changePassword}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter justify="left">
                <div className={classes.bottomOptions}>
                  <Button
                    className={classes.submitButton}
                    color="primary"
                    onClick={this.changePassword}
                  >
                    Save
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

ChangePassword.defaultProps = {
  app: {
    loading: 0
  },
  classes: {},
  changePassword: () => {}
};

ChangePassword.propTypes = {
  app: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  changePassword: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  ChangePassword,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  loginStyle
);
