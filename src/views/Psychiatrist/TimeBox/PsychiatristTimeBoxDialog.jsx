// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import GregorianTimePicker from "components/Calendar/GregorianTimePicker.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";

// MARK: component

class PsychiatristTimeBoxDialog extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
  }

  createBaseState = () => {
    return {
      date: this.props.baseFilter.substring(6, 16),
      start_time: null,
      end_time: null
    };
  };

  createDataState = () => {
    return this.data;
  };

  updateData = () => {
    if (
      this.checkIsEmptyTextWithNameError(this.state.start_time, "Start time") ||
      this.checkIsEmptyTextWithNameError(this.state.end_time, "End time")
    ) {
      return;
    }

    var data = {
      start_time: this.state.date + "T" + this.state.start_time + ":00",
      end_time: this.state.date + "T" + this.state.end_time + ":00"
    };

    this.props.updateFormCallBack("", data, this.state);
  };

  render() {
    return (
      <div style={{ width: "600px" }}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GregorianTimePicker
              time={this.state["start_time"]}
              onChange={e => {
                this.onChangeHandler(e, "start_time", "raw");
              }}
              title={"Start time * (Mandatory)"}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <GregorianTimePicker
              time={this.state["end_time"]}
              onChange={e => {
                this.onChangeHandler(e, "end_time", "raw");
              }}
              title={"End time * (Mandatory)"}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

PsychiatristTimeBoxDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  PsychiatristTimeBoxDialog,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  dialogStyle
);
