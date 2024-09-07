// MARK: library imports
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
// MARK: ui imports
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import withStyles from "@material-ui/core/styles/withStyles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// MARK: project ui imports
import {
  primaryColor,
  dangerColor
} from "assets/styles/material-dashboard-react.jsx";
import customInputStyle from "assets/styles/components/customInputStyle.jsx";

function CustomSelect({ ...props }) {
  const theme = createMuiTheme({
    direction: "ltr",
    typography: {
      useNextVariants: true
    },
    palette: {
      primary: { main: primaryColor },
      secondary: { main: dangerColor }
    }
  });
  const jss = create({ plugins: [...jssPreset().plugins] });

  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    items
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });
  return (
    <StylesProvider jss={jss}>
      <MuiThemeProvider theme={theme}>
        <FormControl
          {...formControlProps}
          className={formControlProps.className + " " + classes.formControl}
        >
          {labelText !== undefined ? (
            <InputLabel
              className={classes.labelRoot + labelClasses}
              htmlFor={id}
              {...labelProps}
            >
              {labelText}
            </InputLabel>
          ) : null}
          <Select
            value={props.value}
            classes={{
              root: marginTop,
              disabled: classes.disabled
            }}
            id={id}
            className={classes.select}
            {...inputProps}
          >
            {items.map((prop, key) => {
              return (
                <MenuItem key={key} value={key}>
                  {prop}
                </MenuItem>
              );
            })}
          </Select>
          {error ? (
            <Clear
              className={classes.feedback + " " + classes.labelRootError}
            />
          ) : success ? (
            <Check
              className={classes.feedback + " " + classes.labelRootSuccess}
            />
          ) : null}
        </FormControl>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  items: PropTypes.array,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomSelect);
