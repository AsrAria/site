// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
// MARK: ui imports
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import { primaryColor } from "assets/styles/material-dashboard-react.jsx";
import loadingDialogStyle from "assets/styles/components/loadingDialogStyle.jsx";

// MARK: component

class LoadingDialog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Dialog open={this.props.open}>
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent className={classes.contentText}>
          <DialogContentText>{this.props.description}</DialogContentText>
        </DialogContent>
        <div className={classes.bottomOptions}>
          <ReactLoading
            className={classes.loadingItem}
            color={primaryColor}
            type={"spin"}
            height={30}
            width={30}
          />
        </div>
      </Dialog>
    );
  }
}

// MARK: prop type validation

LoadingDialog.defaultProps = {
  open: false
};

LoadingDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  LoadingDialog,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  loadingDialogStyle
);
