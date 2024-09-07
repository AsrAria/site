// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
// MARK: project imports
import { downloadFile } from "helper/restHelper.js";
import { formatDateTime } from "helper/timeHelper.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import DraggableChipList from "components/Draggable/DraggableChipList.jsx";
import TestResult from "components/Test/TestResult.jsx";
import PersonMeetingCreateDialog from "views/Person/Meeting/PersonMeetingCreateDialog.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";

// MARK: component

class PersonHealthRecordDialog extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
  }

  createBaseState = () => {
    return {
      type: "",
      data: {},
      creator: {},
      create_time: 0,
      shared_with: [],
      openCreateMeetingDialog: false
    };
  };

  createDataState = () => {
    return this.data;
  };

  updateData = () => {
    var shared_with = [];
    for (var shared_with_item of this.state.shared_with) {
      shared_with.push(shared_with_item.id);
    }
    var data = {
      shared_with: shared_with
    };

    this.props.updateFormCallBack("", data, this.state);
  };

  render() {
    const { classes, width } = this.props;

    return (
      <div style={{ width: isWidthUp("sm", width) ? "900px" : "100%" }}>
        {this.createSelectDialog(
          () => {
            return "Email";
          },
          item => {
            return item.email;
          },
          "",
          null
        )}

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

        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <CustomInput
              defaultValue={this.state.type === 0 ? "Test" : "Meeting"}
              labelText="Type"
              id="type"
              formControlProps={{
                disabled: true,
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <CustomInput
              defaultValue={this.state.creator.name}
              labelText="Creator"
              id="creator"
              formControlProps={{
                disabled: true,
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <CustomInput
              defaultValue={formatDateTime(this.state.create_time)}
              labelText="Time"
              id="create_time"
              formControlProps={{
                disabled: true,
                fullWidth: true
              }}
            />
          </GridItem>
          {this.props.enableEdit ? (
            <GridItem xs={12} sm={12} md={12}>
              <div className={isWidthUp("sm", width) ? classes.horizontal : ""}>
                <DraggableChipList
                  items={this.state.shared_with}
                  itemsChangeHandler={items => {
                    this.setState(
                      () => ({
                        shared_with: items
                      }),
                      () => {
                        this.updateData();
                      }
                    );
                  }}
                />
                <Button
                  onClick={() => {
                    this.handleOpenSelectDialog(
                      () => {},
                      "shared_with",
                      "object_array",
                      "Share",
                      "person/" + this.props.user.profile.id + "/organization"
                    );
                  }}
                  color="success"
                  className={
                    isWidthUp("sm", width)
                      ? classes.addButton
                      : classes.addButtonBig
                  }
                >
                  Share
                </Button>
              </div>
            </GridItem>
          ) : null}
          {this.state.type === 0 ? (
            <GridItem xs={12} sm={12} md={12}>
              <TestResult data={this.state.data} tab={0} />
              {this.props.enableEdit ? (
                <div className={classes.horizontal}>
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
                    className={classes.selectButton}
                  >
                    Create
                  </Button>
                </div>
              ) : null}
            </GridItem>
          ) : null}
          {this.state.type === 1 ? (
            <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                defaultValue={this.state.data.result}
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
          {this.state.type === 1 && this.state.data.attachment !== "" ? (
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.horizontal}>
                <Button
                  onClick={() => {
                    downloadFile(
                      this.state.data.attachment,
                      this.state.id + ".zip"
                    );
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
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

PersonHealthRecordDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  withWidth()(PersonHealthRecordDialog),
  [],
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  dialogStyle
);
