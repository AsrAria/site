// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: project imports
import * as actionCreators from "actions/user.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";

// MARK: component

class PaymentDialog extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
  }

  createBaseState = () => {
    return {
      amount: 0,
      gateway: "",
      status: 0,
      tracking_id: "",
      payment_id: "",
      payment_time: "",
      user: {
        id: "",
        email: ""
      }
    };
  };

  createDataState = () => {
    return this.data;
  };

  updateData = () => {};

  render() {
    return (
      <div style={{ width: "900px" }}>
        {this.createLoadingDialog()}
        <GridContainer>
          {" "}
          <GridItem xs={12} sm={6} md={6}>
            <CustomInput
              value={this.data.amount}
              labelText="Amount"
              id="amount"
              formControlProps={{
                disabled: true,
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <CustomInput
              value={["In progress", "Success", "Unsuccess"][this.data.status]}
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
              value={this.data.tracking_id}
              labelText="Tracking id"
              id="tracking_id"
              formControlProps={{
                disabled: true,
                fullWidth: true
              }}
            />
          </GridItem>
          {this.data.payment_id !== undefined ? (
            <GridItem xs={12} sm={6} md={6}>
              <CustomInput
                value={this.data.payment_id}
                labelText="Payment id"
                id="payment_id"
                formControlProps={{
                  disabled: true,
                  fullWidth: true
                }}
              />
            </GridItem>
          ) : null}
          {this.data.payment_time !== undefined ? (
            <GridItem xs={12} sm={6} md={6}>
              <CustomInput
                value={this.data.payment_time}
                labelText="Payment time"
                id="payment_time"
                formControlProps={{
                  disabled: true,
                  fullWidth: true
                }}
              />
            </GridItem>
          ) : null}
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

PaymentDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  uploadFile: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  PaymentDialog,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      admin: state.admin
    };
  },
  dialogStyle
);
