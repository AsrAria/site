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
import BaseDialog from "components/Base/BaseDialog.jsx";
import TestResult from "components/Test/TestResult.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";

// MARK: component

class OrganizationPersonHealthRecortDialog extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
  }

  createBaseState = () => {
    return {
      type: "",
      data: {},
      creator: {},
      create_time: 0
    };
  };

  createDataState = () => {
    return this.data;
  };

  updateData = () => {};

  render() {
    const { classes, width } = this.props;

    return (
      <div style={{ width: isWidthUp("sm", width) ? "900px" : "100%" }}>
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
          {this.state.type === 0 ? (
            <GridItem xs={12} sm={12} md={12}>
              <TestResult data={this.state.data} tab={0} />
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

OrganizationPersonHealthRecortDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  withWidth()(OrganizationPersonHealthRecortDialog),
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  dialogStyle
);
