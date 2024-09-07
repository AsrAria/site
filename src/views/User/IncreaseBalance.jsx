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

class IncreaseBalance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: ""
    };
  }

  increaseBalance = () => {
    const { amount } = this.state;
    if (amount === "") {
      toast.error("Select the amount.");
      return;
    }
    this.props.increaseBalance(this.props.user.profile.id, parseInt(amount));
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
                  <div className={classes.cardTitleWhite}>Increase balance</div>
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
                      labelText="Amount"
                      id="amount"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        onChange: e => {
                          this.onChangeHandler(e, "amount");
                        }
                      }}
                      onEnter={this.increaseBalance}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter justify="left">
                <div className={classes.bottomOptions}>
                  <Button
                    className={classes.submitButton}
                    color="primary"
                    onClick={this.increaseBalance}
                  >
                    Pay
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

IncreaseBalance.defaultProps = {
  app: {
    loading: 0
  },
  classes: {},
  increaseBalance: () => {}
};

IncreaseBalance.propTypes = {
  app: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  increaseBalance: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  IncreaseBalance,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  loginStyle
);
