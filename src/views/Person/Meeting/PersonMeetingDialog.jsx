// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
// MARK: project imports
import * as userActionCreators from "actions/user.js";
import * as meetingActionCreators from "actions/meeting.js";
import { downloadFile } from "helper/restHelper.js";
import { formatDateTime } from "helper/timeHelper.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import TestResult from "components/Test/TestResult.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import LoadingDialog from "components/Dialog/LoadingDialog.jsx";
import PersonMeetingCreateDialog from "views/Person/Meeting/PersonMeetingCreateDialog.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";

// MARK: component

class PersonMeetingDialog extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
    if (this.data.person_have_notification) {
      this.props.handleReloadPage();
      this.props.getProfile(
        this.props.user.profile.role,
        this.props.user.profile.id
      );
    }
  }

  createBaseState = () => {
    return {
      tab: 0,
      openCreateDialog: false
    };
  };

  createDataState = () => {
    this.data.score = this.data.score - 1;
    return this.data;
  };

  updateData = () => {
    if (
      this.checkConditionWithError(this.state.status === 2, "") ||
      this.checkConditionWithError(
        this.state.status === 2 && parseInt(this.state.score) <= 0,
        "Choose your score to the meeting."
      )
    ) {
      return;
    }

    if (this.state.status === 3) {
      this.props.updateFormCallBack(
        "",
        {
          comment: this.state.comment,
          score: parseInt(this.state.score) + 1
        },
        this.state
      );
    } else if (this.state.status === 0 || this.state.status === 1) {
      this.props.updateFormCallBack(
        "",
        { accepted: this.state.person_accepted },
        this.state
      );
    }
  };

  createInformationTab = () => {
    const { classes } = this.props;

    return (
      <GridContainer>
        {this.createLoadingDialog()}
        <LoadingDialog
          open={this.props.app.loading > 0}
          title={"Loading"}
          description={"Please wait a moment ..."}
        />

        {this.state.psychiatrist !== undefined ? (
          <PersonMeetingCreateDialog
            open={this.state.openCreateDialog}
            psychiatrist={this.state.psychiatrist}
            handleSave={() => {
              this.setState(() => ({
                openCreateDialog: false
              }));
            }}
            handleCancel={() => {
              this.setState(() => ({
                openCreateDialog: false
              }));
            }}
          />
        ) : null}

        {this.state.person !== undefined ? (
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.horizontal}>
              <CustomInput
                defaultValue={
                  this.state.psychiatrist !== undefined
                    ? this.state.psychiatrist.name
                    : ""
                }
                labelText="Psychiatrist"
                id="psychiatrist_name"
                formControlProps={{
                  disabled: true,
                  fullWidth: true
                }}
              />
            </div>
          </GridItem>
        ) : null}

        <GridItem xs={12} sm={6} md={6}>
          <CustomInput
            defaultValue={
              ["New", "Accepted", "Rejected", "Completed"][this.state.status]
            }
            labelText="Status"
            id="status"
            formControlProps={{
              disabled: true,
              fullWidth: true
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <CustomInput
            defaultValue={this.state.price}
            labelText="Price"
            id="price"
            formControlProps={{
              disabled: true,
              fullWidth: true
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <CustomInput
            defaultValue={formatDateTime(this.state.start_time)}
            labelText="Start"
            id="start_time"
            formControlProps={{
              disabled: true,
              fullWidth: true
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <CustomInput
            defaultValue={formatDateTime(this.state.end_time)}
            labelText="End"
            id="end_time"
            formControlProps={{
              disabled: true,
              fullWidth: true
            }}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <div className={classes.horizontal}>
            <CustomInput
              labelText="Add To Google Calendar"
              id="open_meeting"
              formControlProps={{
                disabled: true,
                fullWidth: true
              }}
            />
            <Button
              onClick={() => {
                this.props.addToCalendar(this.state);
              }}
              color="success"
              className={classes.selectButton}
            >
              Add
            </Button>
          </div>
        </GridItem>

        {this.state.status === 0 || this.state.status === 1 ? (
          <GridItem xs={12} sm={6} md={6}>
            <div className={this.props.classes.checkItem}>
              <label className={this.props.classes.checkTitle}>
                Person accepted or not?
              </label>
              <Checkbox
                className={this.props.classes.checkBox}
                checked={this.state.person_accepted}
                disabled={false}
                onChange={e => {
                  this.onChangeHandler(e, "person_accepted", "check");
                }}
                checkedIcon={
                  <Check className={this.props.classes.checkedIcon} />
                }
                icon={<Check className={this.props.classes.uncheckedIcon} />}
              />
            </div>
          </GridItem>
        ) : null}
        {this.state.status === 0 || this.state.status === 1 ? (
          <GridItem xs={12} sm={6} md={6}>
            <div className={this.props.classes.checkItem}>
              <label className={this.props.classes.checkTitle}>
                Psychiatrist accepted or not?
              </label>
              <Checkbox
                className={this.props.classes.checkBox}
                checked={this.state.psychiatrist_accepted}
                disabled={true}
                checkedIcon={
                  <Check className={this.props.classes.checkedIcon} />
                }
                icon={<Check className={this.props.classes.uncheckedIcon} />}
              />
            </div>
          </GridItem>
        ) : null}

        {this.state.status === 3 ? (
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.result}
              labelText="Result"
              id="result"
              formControlProps={{
                disabled: true,
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                rows: 10
              }}
            />
          </GridItem>
        ) : null}
        {this.state.status === 3 && this.state.attachment !== "" ? (
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.horizontal}>
              <Button
                onClick={() => {
                  downloadFile(this.state.attachment, this.state.id + ".zip");
                }}
                color="success"
                className={classes.downloadButton}
              >
                Download
              </Button>
              <CustomInput
                value={"Attachment uploaded by psychiatrist."}
                labelText="Attachment"
                id="type"
                formControlProps={{
                  disabled: true,
                  fullWidth: true
                }}
              />
            </div>
          </GridItem>
        ) : null}

        {this.state.status === 3 ? (
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.comment}
              labelText="Comment"
              id="comment"
              formControlProps={{
                disabled: false,
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                rows: 2,
                onChange: e => {
                  this.onChangeHandler(e, "comment", "text");
                }
              }}
            />
          </GridItem>
        ) : null}
        {this.state.status === 3 ? (
          <GridItem xs={12} sm={12} md={12}>
            <CustomSelect
              value={this.state.score}
              labelText="Score * (Mandatory)"
              id="score"
              formControlProps={{
                disabled: false,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "score");
                }
              }}
              items={["*", "**", "***", "****", "*****"]}
            />
          </GridItem>
        ) : null}

        {this.state.person !== undefined ? (
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.horizontal}>
              <CustomInput
                labelText="Create new meeting"
                id="create_meeting"
                formControlProps={{
                  disabled: true,
                  fullWidth: true
                }}
              />
              <Button
                onClick={() => {
                  this.setState(() => ({
                    openCreateDialog: true
                  }));
                }}
                color="success"
                className={classes.selectButton}
              >
                Create
              </Button>
            </div>
          </GridItem>
        ) : null}

        {this.state.status === 1 || this.state.status === 3 ? (
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.horizontal}>
              <CustomInput
                labelText="Open the meeting room"
                id="open_meeting"
                formControlProps={{
                  disabled: true,
                  fullWidth: true
                }}
              />
              <Button
                onClick={() => {
                  this.props.getAddress(
                    this.state.id,
                    response => {
                      window.location.href = response.data.url;
                    },
                    () => {}
                  );
                }}
                color="success"
                className={classes.selectButton}
              >
                Open
              </Button>
            </div>
          </GridItem>
        ) : null}
      </GridContainer>
    );
  };

  createHealthTestTab = () => {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={11} md={11}>
          <TestResult data={this.state.health_test.data} tab={0} />
        </GridItem>
      </GridContainer>
    );
  };

  render() {
    const { classes, width } = this.props;

    return (
      <div style={{ width: isWidthUp("sm", width) ? "900px" : "100%" }}>
        <Tabs
          value={this.state.tab}
          onChange={(e, value) => {
            var state = { tab: value };
            this.setState(() => state);
          }}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab classes={{ root: classes.tab }} label={"Information"} />
          <Tab classes={{ root: classes.tab }} label={"Health assessment"} />
        </Tabs>

        {this.state.tab === 0
          ? this.createInformationTab()
          : this.createHealthTestTab()}
      </div>
    );
  }
}

// MARK: prop type validation

PersonMeetingDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  getAddress: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  addToCalendar: PropTypes.func.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  withWidth()(PersonMeetingDialog),
  { ...userActionCreators, ...meetingActionCreators },
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  dialogStyle
);
