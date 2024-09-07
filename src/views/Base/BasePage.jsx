// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
// MARK: ui imports
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
// MARK: project imports
import { downloadFile } from "helper/restHelper.js";
// MARK: project ui imports
import GregorianDatePicker from "components/Calendar/GregorianDatePicker.jsx";

// MARK: component

class BasePage extends React.Component {
  onChangeHandler = (e, name, type = "value") => {
    let newState = {};

    var data = "";
    var names = name.split(".");

    if (type === "raw") {
      data = e;
    }
    if (type === "text") {
      data = e.target.value;
    }
    if (type === "value") {
      data = e.target.value;
    }
    if (type === "file") {
      data = e.target.files[0];
      e.target.value = null;
    }
    if (type === "check") {
      data = e.target.checked;
    }

    if (names.length === 1) {
      newState[names[0]] = data;
    }

    if (names.length === 2) {
      try {
        newState[names[0]] = this.state[names[0]];
      } catch (e) {
        newState[names[0]] = {};
      }
      newState[names[0]][names[1]] = data;
    }

    this.setState(newState);
  };

  isEmptyString = value => {
    return value === "" || value === null || value === undefined;
  };

  checkConditionWithError = (value, error) => {
    if (value) {
      toast.error(error);
      return true;
    }
    return false;
  };

  checkIsEmptyTextWithNameError = (value, name) => {
    return this.checkConditionWithError(
      this.isEmptyString(value),
      name + " must not be empty."
    );
  };

  createCalendarInput = (name, title) => {
    var names = name.split(".");

    return (
      <GregorianDatePicker
        date={
          names.length === 1
            ? this.state[names[0]]
            : this.state[names[0]][names[1]]
        }
        onChange={e => {
          this.onChangeHandler(e, name, "raw");
        }}
        title={title}
      />
    );
  };

  createImageInput = name => {
    const { classes } = this.props;

    return (
      <div className={classes.photoBox}>
        <Paper
          className={classes.imageCard}
          onClick={() => {
            this["inputElement_" + name].click();
          }}
        >
          {this.state[name] !== undefined && this.state[name] !== "" ? (
            <Paper className={classes.imageCard}>
              <img
                alt=""
                src={this.state[name + "_uri"]}
                className={classes.imageCard}
              />
              <Icon
                onClick={e => {
                  e.stopPropagation();
                  this.onChangeHandler("", name, "raw");
                }}
                className={classes.imageDeleteIcon}
              >
                {"delete"}
              </Icon>
            </Paper>
          ) : (
            <Icon className={classes.imageAddIcon}>{"camera_alt"}</Icon>
          )}
        </Paper>
        <input
          id={name}
          name={name}
          type="file"
          accept=".png,.jpg,.jpeg"
          className={classes.fileInput}
          ref={input => (this["inputElement_" + name] = input)}
          onChange={e => {
            this.setState(() => ({ loadingDialogOpen: true }));
            this.props.uploadImage(
              this.state.id,
              e.target.files[0],
              name,
              response => {
                this.onChangeHandler(response.url, name, "raw");
                downloadFile(response.url, "image", true, content => {
                  this.onChangeHandler(content, name + "_uri", "raw");
                });
                this.setState(() => ({ loadingDialogOpen: false }));
              },
              () => {
                this.setState(() => ({ loadingDialogOpen: false }));
              }
            );
            e.target.value = null;
          }}
        />
      </div>
    );
  };
}

// MARK: prop type validation

BasePage.defaultProps = {};

BasePage.propTypes = {
  app: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

// MARK: export

export default BasePage;
