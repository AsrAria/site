// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
// MARK: ui imports
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
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

class GregorianDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    };

    moment.locale("en");
    if (
      this.props.date !== "" &&
      this.props.date !== null &&
      this.props.date !== undefined
    ) {
      var dateTime = moment
        .utc(this.props.date, "YYYY-MM-DDTHH-mm-ss")
        .format("YYYY-MM-DDTHH-mm-ss");
      this.onChange(dateTime, false);
      this.state = {
        date: this.getLocalDate(dateTime)
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

  getLocalDateFormat = utcIsoDateTime => {
    return moment
      .utc(utcIsoDateTime, "YYYY-MM-DDTHH-mm-ss")
      .local()
      .locale("en")
      .format("YYYY-MM-DD");
  };

  getLocalDate = utcIsoDateTime => {
    return moment(this.getLocalDateFormat(utcIsoDateTime)).toDate();
  };

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
          date: this.getLocalDate(utcIsoDateTime)
        });
      }
      this.props.onChange(this.getLocalDateFormat(utcIsoDateTime));
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
            <DatePicker
              style={{
                width: "100%",
                marginTop: "10px",
                ".MuiInput-input": {
                  color: "#FF00FF"
                }
              }}
              clearable
              margin="normal"
              id="date-picker-dialog"
              label={this.props.title}
              format="yyyy/MM/dd"
              value={this.state.date}
              onChange={date => {
                if (date == null) {
                  this.onChange("");
                } else {
                  this.onChange(moment(date).format("YYYY-MM-DD"));
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

GregorianDatePicker.defaultProps = {
  title: "Date",
  onChange: () => {},
  autoCleanOnSelect: true
};

GregorianDatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  app: PropTypes.object.isRequired,
  autoCleanOnSelect: PropTypes.bool.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  GregorianDatePicker,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  gregorianCalendarStyle
);
