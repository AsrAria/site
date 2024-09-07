// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
// MARK: ui imports
import Icon from "@material-ui/core/Icon";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
// MARK: project ui import
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import BasePage from "views/Base/BasePage";
import TestResult from "components/Test/TestResult.jsx";
import PersonMeetingCreateDialog from "views/Person/Meeting/PersonMeetingCreateDialog.jsx";
import healthTestStyle from "assets/styles/views/healthTestStyle.jsx";
// MARK: project imports
import * as actionCreators from "actions/person.js";
import { questionList } from "assets/data/questions.jsx";
import { connectComponentWithStyle } from "helper/componentHelper.js";
import { putObject, getObject, removeObject } from "helper/storageHelper.js";

// MARK: component

class PersonHealthTestPage extends BasePage {
  constructor(props) {
    super(props);

    this.createBaseState();
    this.topRef = React.createRef();
  }

  createBaseState = () => {
    var page = -1;
    var choices = [];

    if (Object.entries(this.getChoiceseData()).length === 0) {
      choices = this.createEmptyChoices();
      page = -1;
    } else {
      choices = this.getChoiceseData();
      for (let index = 0; index < choices.length; index++) {
        if (choices[index] !== 0) {
          page = parseInt((index + 1) / 10);
        }
      }
    }

    this.state = {
      page: page,
      choices: choices,
      result: null,
      openCreateMeetingDialog: false
    };
  };

  // MARK: api functions

  submitTest = () => {
    this.props.submitTest(
      this.props.user.profile.id,
      this.state.choices,
      result => {
        this.setState({ result: result });
        this.deleteChoiceseData();
      }
    );
  };

  clearTest = () => {
    this.setState(() => ({ choices: this.createEmptyChoices(), page: -1 }));
    this.deleteChoiceseData();
  };

  createEmptyChoices = () => {
    var choices = [];
    for (let index = 0; index < questionList.length; index++) {
      choices.push(0);
    }
    return choices;
  };

  // MARK: storage functions

  getChoiceseData = () => {
    return getObject("lastHealthTest");
  };

  deleteChoiceseData = () => {
    removeObject("lastHealthTest");
  };

  syncChoiceseData = () => {
    putObject("lastHealthTest", this.state.choices);
  };

  // MARK: ui functions

  createQuestionBox = (index, question) => {
    const { classes } = this.props;

    return (
      <div className={classes.questionCard}>
        <p className={classes.questionText}>
          {index + 1}- {question}
        </p>
        <div className={classes.questionSubmitBox}>
          <Button
            className={classes.yesButton}
            color="success"
            onClick={() => {
              let list = this.state.choices;
              list[index] = 1;
              this.setState(() => ({ choices: list }));
              this.syncChoiceseData();
            }}
          >
            Yes
            {this.state.choices[index] === 1 ? (
              <Icon className={classes.doneIcon}>{"done"}</Icon>
            ) : null}
          </Button>
          <Button
            className={classes.noButton}
            color="danger"
            onClick={() => {
              let list = this.state.choices;
              list[index] = 2;
              this.setState(() => ({ choices: list }));
              this.syncChoiceseData();
            }}
          >
            No
            {this.state.choices[index] === 2 ? (
              <Icon className={classes.doneIcon}>{"done"}</Icon>
            ) : null}
          </Button>
        </div>
      </div>
    );
  };

  render() {
    const { classes, width } = this.props;

    return (
      <div ref={this.topRef}>
        {this.state.openCreateMeetingDialog ? (
          <PersonMeetingCreateDialog
            open={this.state.openCreateMeetingDialog}
            psychiatrist={null}
            handleSave={() => {
              this.setState(() => ({
                openCreateMeetingDialog: false
              }));
            }}
            handleCancel={() => {
              this.setState(() => ({
                openCreateMeetingDialog: false
              }));
            }}
          />
        ) : null}

        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <div>
                  <div className={classes.cardTitleWhite}>
                    Health Assessment
                  </div>
                  {this.props.app.loading > 0 ? (
                    <ReactLoading
                      className={classes.loadingItem}
                      type={"spin"}
                      height={30}
                      width={30}
                    />
                  ) : null}
                </div>
                {this.state.page > -1 ? (
                  <Button
                    className={classes.reloadButton}
                    onClick={() => {
                      this.clearTest();
                    }}
                    color="warning"
                  >
                    Clear
                  </Button>
                ) : null}
              </CardHeader>
              {this.state.page >= 0 ? (
                <GridContainer justify="center">
                  {this.state.result === null ? (
                    <GridItem xs={12} sm={12} md={12}>
                      {questionList
                        .slice(this.state.page * 10, this.state.page * 10 + 10)
                        .map((prop, key) => {
                          return this.createQuestionBox(
                            this.state.page * 10 + key,
                            prop
                          );
                        })}
                      <CardFooter justify="left">
                        <div className={classes.bottomOptions}>
                          {this.state.page === 17 ? (
                            <Button
                              className={classes.nextButton}
                              color="success"
                              onClick={this.submitTest}
                            >
                              Submit
                            </Button>
                          ) : null}
                          {this.state.page < 17 ? (
                            <Button
                              className={classes.nextButton}
                              color="primary"
                              onClick={() => {
                                let found = false;
                                for (
                                  let index = 0;
                                  index < this.state.page * 10 + 10;
                                  index++
                                ) {
                                  if (this.state.choices[index] === 0) {
                                    found = true;
                                  }
                                }
                                if (found) {
                                  toast.error(
                                    "You must first enter the answers to all the previous questions."
                                  );
                                  return;
                                }
                                this.setState(() => ({
                                  page: Math.min(this.state.page + 1, 17)
                                }));

                                this.topRef.current.scrollIntoView();
                              }}
                            >
                              Next
                            </Button>
                          ) : null}
                          {this.state.page > 0 ? (
                            <Button
                              className={classes.previousButton}
                              color="primary"
                              onClick={() => {
                                this.setState(() => ({
                                  page: Math.max(this.state.page - 1, 0)
                                }));
                              }}
                            >
                              Previous
                            </Button>
                          ) : null}
                        </div>
                      </CardFooter>
                    </GridItem>
                  ) : (
                    <GridItem xs={12} sm={12} md={12}>
                      <div className={classes.createMeetingBox}>
                        <CustomInput
                          defaultValue={
                            isWidthUp("sm", width)
                              ? "Can make an appointment with a psychiatrist."
                              : "Create meeting"
                          }
                          labelText="Meeting"
                          id="meeting"
                          formControlProps={{
                            disabled: true,
                            fullWidth: true
                          }}
                        />
                        <Button
                          onClick={() => {
                            this.setState(() => ({
                              openCreateMeetingDialog: true
                            }));
                          }}
                          color="success"
                          className={classes.reloadButton}
                        >
                          Create
                        </Button>
                      </div>
                      <div className={classes.resultBox}>
                        <TestResult data={this.state.result} tab={0} />
                      </div>
                    </GridItem>
                  )}
                </GridContainer>
              ) : (
                <GridItem xs={12} sm={12} md={12}>
                  <p className={classes.descriptionText}>
                    The health assessment consists of 175 questions.
                  </p>
                  <CardFooter justify="left">
                    <div className={classes.bottomOptions}>
                      <Button
                        className={classes.nextButton}
                        color="success"
                        onClick={() => {
                          this.setState(() => ({
                            page: 0
                          }));
                        }}
                      >
                        Start
                      </Button>
                    </div>
                  </CardFooter>
                </GridItem>
              )}
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

PersonHealthTestPage.defaultProps = {
  app: {
    loading: 0
  },
  classes: {},
  submitTest: () => {}
};

PersonHealthTestPage.propTypes = {
  app: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  submitTest: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  withWidth()(PersonHealthTestPage),
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  healthTestStyle
);
