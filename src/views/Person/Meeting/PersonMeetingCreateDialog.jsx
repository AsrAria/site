// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
// MARK: ui imports
import Dialog from "@material-ui/core/Dialog";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
// MARK: project ui imports
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButtons/Button.jsx";
import DialogContent from "@material-ui/core/DialogContent";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";
import { primaryColor } from "assets/styles/material-dashboard-react.jsx";
// MARK: project imports
import * as personActionCreators from "actions/person.js";
import * as psychiatristActionCreators from "actions/psychiatrist.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";

// MARK: component

class PersonMeetingCreateDialog extends BaseDialog {
  isFirstOpen = true;

  constructor(props) {
    super(props);

    this.initState();
  }

  createBaseState = () => {
    return {
      length: null,
      currentDate: 0,
      psychiatrist: null,
      psychiatristSuggestions: "",
      timeBoxSuggestions: "",
      selectedTimeBox: null,
      loadingDialogOpen: false
    };
  };

  reloadPsychiatristSuggestions = () => {
    this.setState(() => ({
      psychiatristSuggestions: "loading"
    }));

    this.props.getPsychiatristSuggestion(
      this.props.user.profile.id,
      list => {
        this.setState(() => ({
          psychiatristSuggestions: list
        }));
      },
      () => {
        this.setState(() => ({
          psychiatristSuggestions: null
        }));
      }
    );
  };

  reloadMeetingSuggestions = () => {
    const { width } = this.props;

    let startDate = new Date();
    startDate.setDate(startDate.getDate() + this.state.currentDate);
    let endDate = new Date();
    endDate.setDate(
      endDate.getDate() +
        this.state.currentDate +
        (isWidthUp("sm", width) ? 7 : 3)
    );

    this.setState(() => ({
      timeBoxSuggestions: "loading"
    }));

    this.props.getMeetingSuggestion(
      this.props.user.profile.id,
      this.state.psychiatrist.id,
      startDate.toISOString().substring(0, 10),
      endDate.toISOString().substring(0, 10),
      this.state.length,
      list => {
        this.setState(() => ({
          timeBoxSuggestions: list,
          selectedTimeBox: null
        }));
      },
      () => {
        this.setState(() => ({
          timeBoxSuggestions: null
        }));
      }
    );
  };

  createPsychitristItem = psychiatrist => {
    const { classes } = this.props;

    return (
      <Card>
        <div className={classes.psychiatristItem}>
          <div stule={{ position: "relative", height: "120px" }}>
            <img
              alt=""
              src={psychiatrist.photo}
              className={classes.psychiatristImage}
            />
          </div>
          <div className={classes.psychiatristName}>
            {psychiatrist.name}
            <br />
            Score: {psychiatrist.score}
          </div>
          <div>
            <Button
              className={classes.psychiatristButton}
              onClick={() => {
                this.setState(() => ({
                  psychiatrist: psychiatrist
                }));
              }}
              color="success"
            >
              Select
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  render() {
    const { classes, width } = this.props;

    if (this.isFirstOpen) {
      this.isFirstOpen = false;
      if (this.props.psychiatrist == null) {
        this.reloadPsychiatristSuggestions();
      } else {
        this.setState(() => ({
          psychiatrist: this.props.psychiatrist
        }));
      }
    }

    return (
      <Dialog
        classes={{ paper: classes.dialog }}
        open={this.props.open}
        onClose={() => this.props.handleCancel()}
      >
        <div>
          {this.createLoadingDialog()}

          <DialogContent className={classes.dialogContent}>
            {this.state.psychiatrist == null ? (
              <GridContainer>
                {this.state.psychiatristSuggestions === "loading" ? (
                  <div className={classes.centerLoadingBox}>
                    <ReactLoading
                      className={classes.centerLoadingDialog}
                      color={primaryColor}
                      type={"spin"}
                      height={30}
                      width={30}
                    />
                  </div>
                ) : this.state.psychiatristSuggestions === null ? (
                  <div className={classes.centerLoadingBox}>
                    <ReactLoading
                      className={classes.centerLoadingDialog}
                      color={primaryColor}
                      type={"spin"}
                      height={30}
                      width={30}
                    />
                  </div>
                ) : null}
                {this.state.psychiatristSuggestions !== null &&
                this.state.psychiatristSuggestions !== "" &&
                this.state.psychiatristSuggestions !== "loading" ? (
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.formTitle}>
                      Choose the psychiatrist you want.
                    </div>
                  </GridItem>
                ) : null}
                {this.state.psychiatristSuggestions !== null &&
                this.state.psychiatristSuggestions !== "" &&
                this.state.psychiatristSuggestions !== "loading"
                  ? this.state.psychiatristSuggestions.map((prop, key) => {
                      return (
                        <GridItem xs={12} sm={6} md={6} key={key}>
                          {this.createPsychitristItem(prop)}
                        </GridItem>
                      );
                    })
                  : null}
              </GridContainer>
            ) : (
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    defaultValue={this.props.user.profile.name}
                    labelText="Person"
                    id="person"
                    formControlProps={{
                      disabled: true,
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <div className={classes.horizontal}>
                    <CustomInput
                      defaultValue={this.state.psychiatrist.name}
                      labelText="Psychiatrist"
                      id="psychiatrist"
                      formControlProps={{
                        disabled: true,
                        fullWidth: true
                      }}
                    />
                    <Button
                      onClick={() => {
                        this.setState(
                          () => this.createBaseState(),
                          () => {
                            this.reloadPsychiatristSuggestions();
                          }
                        );
                      }}
                      color="success"
                      autoFocus
                      className={classes.fileButton}
                    >
                      Select
                    </Button>
                  </div>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <CustomSelect
                    value={this.state.length}
                    labelText={"Length"}
                    id={"length"}
                    formControlProps={{
                      disabled: false,
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: e => {
                        this.setState(
                          () => ({
                            length: e.target.value
                          }),
                          () => {
                            this.reloadMeetingSuggestions();
                          }
                        );
                      }
                    }}
                    items={["30 minutes", "60 minutes", "90 minutes"]}
                  />
                </GridItem>

                {this.state.timeBoxSuggestions !== null &&
                this.state.timeBoxSuggestions !== "" &&
                this.state.timeBoxSuggestions !== "loading" ? (
                  <GridItem xs={12} sm={12} md={12}>
                    <Button
                      onClick={() => {
                        this.setState(
                          {
                            currentDate:
                              this.state.currentDate -
                              (isWidthUp("sm", width) ? 7 : 3)
                          },
                          () => {
                            this.reloadMeetingSuggestions();
                          }
                        );
                      }}
                      color="success"
                      autoFocus
                      className={classes.previousButton}
                    >
                      {isWidthUp("sm", width) ? "Previous" : "Previous"}
                    </Button>
                    <Button
                      onClick={() => {
                        this.setState(
                          {
                            currentDate:
                              this.state.currentDate +
                              (isWidthUp("sm", width) ? 7 : 3)
                          },
                          () => {
                            this.reloadMeetingSuggestions();
                          }
                        );
                      }}
                      color="success"
                      autoFocus
                      className={classes.nextButton}
                    >
                      {isWidthUp("sm", width) ? "Next Week" : "Next"}
                    </Button>
                  </GridItem>
                ) : null}

                <GridItem xs={12} sm={12} md={12}>
                  {this.state.timeBoxSuggestions === "loading" ? (
                    <div className={classes.centerLoadingBox}>
                      <ReactLoading
                        className={classes.centerLoadingDialog}
                        color={primaryColor}
                        type={"spin"}
                        height={30}
                        width={30}
                      />
                    </div>
                  ) : null}
                  {this.state.timeBoxSuggestions !== null &&
                  this.state.timeBoxSuggestions !== "" &&
                  this.state.timeBoxSuggestions !== "loading" ? (
                    <div className={classes.horizontal}>
                      {this.state.timeBoxSuggestions.map((prop, key) => {
                        return (
                          <div className={classes.suggestionList} key={key}>
                            {prop.date}
                            {prop.time_boxes.map((prop, key) => {
                              return (
                                <div
                                  className={
                                    this.state.selectedTimeBox != null &&
                                    this.state.selectedTimeBox.id === prop.id
                                      ? classes.suggestionItemSelected
                                      : classes.suggestionItem
                                  }
                                  key={key}
                                  onClick={() => {
                                    this.setState(() => ({
                                      selectedTimeBox: prop
                                    }));
                                  }}
                                >
                                  {prop.start_time.substring(11, 16)}
                                  <br />
                                  {(prop.length + 1) * 30}
                                  {"-minutes"}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    onClick={() => {
                      if (this.state.length === null) {
                        toast.error("Select the length of the meeting.");
                        return;
                      }

                      if (this.state.selectedTimeBox === null) {
                        toast.error("Select the meeting time.");
                        return;
                      }

                      this.setState(() => ({ loadingDialogOpen: true }));

                      this.props.personCreateMeeting(
                        this.props.user.profile.id,
                        this.state.psychiatrist.id,
                        this.state.selectedTimeBox.start_time,
                        this.state.selectedTimeBox.length,
                        () => {
                          this.setState(this.createBaseState(), () => {
                            this.props.handleSave();
                          });
                          toast.success("New meeting successfully created.");
                        },
                        () => {
                          this.setState(() => ({ loadingDialogOpen: false }));
                        }
                      );
                    }}
                    color="success"
                    autoFocus
                    className={classes.submitButton}
                  >
                    Create
                  </Button>
                </GridItem>
              </GridContainer>
            )}
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

// MARK: prop type validation

PersonMeetingCreateDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  psychiatrist: PropTypes.object,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  personCreateMeeting: PropTypes.func.isRequired,
  getMeetingSuggestion: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  withWidth()(PersonMeetingCreateDialog),
  { ...personActionCreators, ...psychiatristActionCreators },
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  dialogStyle
);
