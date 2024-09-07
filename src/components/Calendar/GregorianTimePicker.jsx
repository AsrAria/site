// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
// MARK: ui imports
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: priject ui imports
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import {
  primaryColor,
  dangerColor
} from "assets/styles/material-dashboard-react.jsx";
import gregorianCalendarStyle from "assets/styles/components/gregorianCalendarStyle.jsx";

// MARK: component

class GregorianTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null
    };

    moment.locale("en");
    if (
      this.props.time !== "" &&
      this.props.time !== null &&
      this.props.time !== undefined
    ) {
      var dateTime = new Date();
      dateTime.setHours(parseInt(this.props.time.substring(0, 2)));
      dateTime.setMinutes(parseInt(this.props.time.substring(3, 5)));
      this.onChange(dateTime, false);
      this.state = {
        time: dateTime
      };
    }
  }

  renderInput = props => (
    <div className={this.props.classes.main}>
      <Button
        onClick={() => {
          props.onClick();
        }}
        color="warning"
        className={this.props.classes.selectButton}
      >
        Select
      </Button>
      <CustomInput
        id={props.id}
        value={props.value}
        labelText={this.props.title}
        formControlProps={{
          disabled: true,
          fullWidth: true
        }}
        {...props.inputProps}
      />
    </div>
  );

  onChange = (utcIsoDateTime, withUpdateState = true) => {
    if (utcIsoDateTime === "" && this.props.autoCleanOnSelect) {
      if (withUpdateState) {
        this.setState({
          date: null
        });
      }
      this.props.onChange(null);
    } else {
      if (withUpdateState) {
        this.setState({
          time: utcIsoDateTime
        });
      }
      this.props.onChange(moment(utcIsoDateTime).format("HH:mm"));
    }
  };

  render() {
    const theme = createMuiTheme({
      direction: "ltr",
      typography: {
        useNextVariants: true
      },
      palette: {
        primary: { main: primaryColor },
        secondary: { main: dangerColor }
      },
      overrides: {
        MuiPickersToolbarText: {
          toolbarTxt: {
            color: "#E9E9E9"
          },
          toolbarBtnSelected: {
            color: "#FFFFFF"
          }
        }
      }
    });

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              style={{
                width: "100%",
                marginTop: "10px",
                ".MuiInput-input": {
                  color: "#FF00FF"
                }
              }}
              clearable
              margin="normal"
              id="time-picker-dialog"
              label={this.props.title}
              format="HH:mm"
              value={this.state.time}
              onChange={time => {
                if (time == null) {
                  this.onChange("");
                } else {
                  this.onChange(time);
                }
              }}
              TextFieldComponent={this.renderInput}
            />
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </div>
    );
  }
}

// MARK: prop type validation

GregorianTimePicker.defaultProps = {
  title: "Time",
  onChange: () => {},
  autoCleanOnSelect: true
};

GregorianTimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  time: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  app: PropTypes.object.isRequired,
  autoCleanOnSelect: PropTypes.bool.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  GregorianTimePicker,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  gregorianCalendarStyle
);
