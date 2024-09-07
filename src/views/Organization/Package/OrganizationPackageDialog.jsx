// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";

// MARK: component

class OrganizationPackageDialog extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
  }

  createBaseState = () => {
    return {
      email: "",
      start_date: "",
      end_date: "",
      budget: 0
    };
  };

  createDataState = () => {
    return this.data;
  };

  updateData = () => {
    if (
      this.checkIsEmptyTextWithNameError(this.state.email, "Email") ||
      this.checkPatternWithNameError(
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$/,
        this.state.email,
        "Email format is incorrect."
      ) ||
      this.checkIsEmptyTextWithNameError(this.state.start_date, "Start") ||
      this.checkIsEmptyTextWithNameError(this.state.end_date, "End") ||
      this.checkIsEmptyTextWithNameError(this.state.budget, "Budget")
    ) {
      return;
    }

    var data = {
      person: this.state.email,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      budget: parseInt(this.state.budget)
    };

    this.props.updateFormCallBack("", data, this.state);
  };

  render() {
    return (
      <div style={{ width: "600px" }}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={
                this.isCreateMode() ? this.state.email : this.state.person.email
              }
              labelText="Eamil"
              id="email"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "email", "text");
                }
              }}
            />
          </GridItem>
          {this.isCreateMode() ? (
            <GridItem xs={12} sm={6} md={6}>
              {this.createCalendarInput("start_date", "Start * (Mandatory)")}
            </GridItem>
          ) : (
            <GridItem xs={12} sm={6} md={6}>
              <CustomInput
                defaultValue={this.state.start_date}
                labelText="Start"
                id="start_date"
                formControlProps={{
                  disabled: true,
                  fullWidth: true
                }}
              />
            </GridItem>
          )}
          {this.isCreateMode() ? (
            <GridItem xs={12} sm={6} md={6}>
              {this.createCalendarInput("end_date", "End * (Mandatory)")}
            </GridItem>
          ) : (
            <GridItem xs={12} sm={6} md={6}>
              <CustomInput
                defaultValue={this.state.end_date}
                labelText="End"
                id="end_date"
                formControlProps={{
                  disabled: true,
                  fullWidth: true
                }}
              />
            </GridItem>
          )}
          {this.isCreateMode() ? (
            <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                defaultValue={this.state.budget}
                labelText="Budget"
                id="budget"
                formControlProps={{
                  disabled: !this.props.enableEdit,
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  onChange: e => {
                    this.onChangeHandler(e, "budget", "text");
                  }
                }}
              />
            </GridItem>
          ) : (
            <GridItem xs={12} sm={6} md={6}>
              <CustomInput
                defaultValue={this.state.budget}
                labelText="Budget"
                id="budget"
                formControlProps={{
                  disabled: true,
                  fullWidth: true
                }}
              />
            </GridItem>
          )}
          {this.isCreateMode() ? null : (
            <GridItem xs={12} sm={6} md={6}>
              <CustomInput
                defaultValue={this.state.balance}
                labelText="Balance"
                id="balance"
                formControlProps={{
                  disabled: true,
                  fullWidth: true
                }}
              />
            </GridItem>
          )}
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

OrganizationPackageDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  OrganizationPackageDialog,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  dialogStyle
);
