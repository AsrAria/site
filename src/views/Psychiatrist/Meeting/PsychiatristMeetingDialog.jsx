// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
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
import TestResult from "components/Test/TestResult.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import LoadingDialog from "components/Dialog/LoadingDialog.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
import PersonHealthRecordDialog from "views/Person/HealthRecord/PersonHealthRecordDialog.jsx";
import PsychiatristMeetingCreateDialog from "views/Psychiatrist/Meeting/PsychiatristMeetingCreateDialog.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";

// MARK: component

class PsychiatristMeetingsPage extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
    if (this.data.psychiatrist_have_notification) {
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
      completed: false,
      openCreateDialog: false
    };
  };

  createDataState = () => {
    return this.data;
  };

  updateData = () => {
    if (this.checkConditionWithError(this.state.status === 2, "")) {
      return;
    }

    if (
      this.state.status === 3 ||
      (this.state.status === 1 &&
        this.state.completed &&
        this.state.psychiatrist_accepted)
    ) {
      this.props.updateFormCallBack(
        "",
        {
          result: this.state.result,
          attachment: this.state.attachment
        },
        this.state
      );
    } else if (this.state.status === 0 || this.state.status === 1) {
      this.props.updateFormCallBack(
        "",
        { accepted: this.state.psychiatrist_accepted },
        this.state
      );
    }
  };

  createInformationTab = () => {
    const { classes, width } = this.props;

    return (
      <GridContainer>
        {this.createLoadingDialog()}
        <LoadingDialog
          open={this.state.app !== undefined && this.state.app.loading > 0}
          title={"Loading"}
          description={"Please wait a moment ..."}
        />

        {this.state.person !== undefined ? (
          <PsychiatristMeetingCreateDialog
            open={this.state.openCreateDialog}
            person={this.state.person}
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
                  this.state.person !== undefined ? this.state.person.name : ""
                }
                labelText="Person"
                id="person_name"
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
                disabled={true}
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
                disabled={false}
                onChange={e => {
                  this.onChangeHandler(e, "psychiatrist_accepted", "check");
                }}
                checkedIcon={
                  <Check className={this.props.classes.checkedIcon} />
                }
                icon={<Check className={this.props.classes.uncheckedIcon} />}
              />
            </div>
          </GridItem>
        ) : null}

        {this.state.status === 1 && this.state.psychiatrist_accepted ? (
          <GridItem xs={12} sm={12} md={12}>
            <div className={this.props.classes.checkItem}>
              <label className={this.props.classes.checkTitle}>
                Meeting completed or not?
              </label>
              <Checkbox
                className={this.props.classes.checkBox}
                checked={this.state.completed}
                disabled={false}
                onChange={e => {
                  this.onChangeHandler(e, "completed", "check");
                }}
                checkedIcon={
                  <Check className={this.props.classes.checkedIcon} />
                }
                icon={<Check className={this.props.classes.uncheckedIcon} />}
              />
            </div>
          </GridItem>
        ) : null}

        {this.state.status === 3 ||
        (this.state.status === 1 &&
          this.state.completed &&
          this.state.psychiatrist_accepted) ? (
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.result}
              labelText="Result"
              id="result"
              formControlProps={{
                disabled: false,
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                rows: 10,
                onChange: e => {
                  this.onChangeHandler(e, "result", "text");
                }
              }}
            />
          </GridItem>
        ) : null}

        {this.state.status === 3 ||
        (this.state.status === 1 &&
          this.state.completed &&
          this.state.psychiatrist_accepted) ? (
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.horizontal}>
              {this.state.attachment !== "" ? (
                <Button
                  onClick={() => {
                    downloadFile(this.state.attachment, this.state.id + ".zip");
                  }}
                  color="success"
                  className={classes.downloadButton}
                >
                  <Icon>{"download"}</Icon>
                </Button>
              ) : null}
              {this.state.attachment !== "" ? (
                <Button
                  onClick={() => {
                    this.onChangeHandler("", "attachment", "raw");
                  }}
                  color="danger"
                  className={classes.downloadButton}
                >
                  <Icon>{"delete"}</Icon>
                </Button>
              ) : null}
              <CustomInput
                value={
                  isWidthUp("sm", width)
                    ? "Zip the desired attachment and then upload."
                    : ""
                }
                labelText="Attachment"
                id="type"
                formControlProps={{
                  disabled: true,
                  fullWidth: true
                }}
              />
              <Button
                onClick={() => {
                  this.inputElement.click();
                }}
                color="success"
                className={classes.selectButton}
              >
                {isWidthUp("sm", width) ? (
                  "Select"
                ) : (
                  <Icon>{"attachment"}</Icon>
                )}
              </Button>
              <input
                id="attachment"
                name="attachment"
                type="file"
                accept=".zip"
                className={classes.fileInput}
                ref={input => (this.inputElement = input)}
                onChange={e => {
                  this.setState(() => ({ loadingDialogOpen: true }));
                  this.props.uploadFile(
                    this.state.id,
                    e.target.files[0],
                    response => {
                      this.onChangeHandler(response.url, "attachment", "raw");
                      this.setState(() => ({ loadingDialogOpen: false }));
                    },
                    () => {
                      this.setState(() => ({ loadingDialogOpen: false }));
                    }
                  );
                  e.target.value = null;
                }}
              />
            </div>
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
                id="open_room"
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

  createHealthRecordsTab = () => {
    const { width } = this.props;

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={11} md={11}>
          <Pagination
            baseUrl={"/person/" + this.state.person.id + "/document"}
            title={"Health Records"}
            tableSize={[12, 12, 12]}
            tableHead={
              isWidthUp("sm", width)
                ? [
                    {
                      name: "Type",
                      size: null
                    },
                    {
                      name: "Creator",
                      size: null
                    },
                    {
                      name: "Time",
                      size: null
                    }
                  ]
                : [
                    {
                      name: "Type",
                      size: null
                    },
                    {
                      name: "Time",
                      size: null
                    }
                  ]
            }
            getItemId={item => {
              return item.id;
            }}
            getItemName={item => {
              return item.key;
            }}
            getItemRow={item => {
              return isWidthUp("sm", width)
                ? [
                    {
                      type: "text",
                      value: item.type === 0 ? "Test" : "Meeting"
                    },
                    {
                      type: "text",
                      value: item.creator.name
                    },
                    {
                      type: "text",
                      value: formatDateTime(item.create_time)
                    }
                  ]
                : [
                    {
                      type: "text",
                      value: item.type === 0 ? "Test" : "Meeting"
                    },
                    {
                      type: "text",
                      value: formatDateTime(item.create_time)
                    }
                  ];
            }}
            editType={"dialog"}
            editDialog={PersonHealthRecordDialog}
            enableAdd={false}
            enableEdit={false}
            enableDelete={false}
          />
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
          <Tab classes={{ root: classes.tab }} label={"Meeting"} />
          <Tab classes={{ root: classes.tab }} label={"Health assessment"} />
          <Tab classes={{ root: classes.tab }} label={"Health records"} />
        </Tabs>

        {this.state.tab === 0
          ? this.createInformationTab()
          : this.state.tab === 1
            ? this.createHealthTestTab()
            : this.createHealthRecordsTab()}
      </div>
    );
  }
}

// MARK: prop type validation

PsychiatristMeetingsPage.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  getAddress: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  addToCalendar: PropTypes.func.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  withWidth()(PsychiatristMeetingsPage),
  { ...userActionCreators, ...meetingActionCreators },
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  dialogStyle
);
