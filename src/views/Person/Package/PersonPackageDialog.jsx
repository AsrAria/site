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

class PersonPackageDialog extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
  }

  createBaseState = () => {
    return {};
  };

  createDataState = () => {
    return this.data;
  };

  updateData = () => {};

  render() {
    return (
      <div style={{ width: "600px" }}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.organization.email}
              labelText="Organization"
              id="organization"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
            />
          </GridItem>
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
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

PersonPackageDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  PersonPackageDialog,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  dialogStyle
);
