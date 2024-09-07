// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import Button from "components/CustomButtons/Button.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import alertDialogStyle from "assets/styles/components/alertDialogStyle.jsx";

// MARK: component

class AlertDialog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Dialog open={this.props.open} onClose={() => this.props.handleCancel()}>
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent className={classes.contentText}>
          <DialogContentText>{this.props.description}</DialogContentText>
        </DialogContent>
        <CardFooter justify="left">
          <div className={classes.bottomOptions}>
            <Button
              className={classes.confirmButton}
              onClick={() => this.props.handleConfirm()}
              color={this.props.buttonColor}
              autoFocus
            >
              Yes
            </Button>
          </div>
        </CardFooter>
      </Dialog>
    );
  }
}

// MARK: prop type validation

AlertDialog.defaultProps = {
  buttonColor: "danger"
};

AlertDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  buttonColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  AlertDialog,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  alertDialogStyle
);
