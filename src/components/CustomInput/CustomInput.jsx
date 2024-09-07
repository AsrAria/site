// MARK: library imports
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
// MARK: ui imports
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import withStyles from "@material-ui/core/styles/withStyles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// MARK: project ui imports
import customInputStyle from "assets/styles/components/customInputStyle.jsx";

function CustomInput({ ...props }) {
  const theme = createMuiTheme({
    direction: "ltr",
    typography: {
      useNextVariants: true
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
    onEnter,
    onClick
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
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
          <Input
            value={props.value}
            defaultValue={props.defaultValue}
            className={classes.input}
            classes={{
              root: marginTop,
              disabled: classes.disabled,
              underline: underlineClasses
            }}
            id={id}
            {...inputProps}
            onClick={onClick}
            onKeyPress={event => {
              if (event.key === "Enter") {
                onEnter();
              }
            }}
          />
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

CustomInput.defaultProps = {
  onClick: () => {},
  onEnter: () => {}
};

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired
};

export default withStyles(customInputStyle)(CustomInput);
