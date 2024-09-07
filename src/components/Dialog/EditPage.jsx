// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
// MARK: ui imports
import GridContainer from "components/Grid/GridContainer.jsx";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import editDialogStyle from "assets/styles/components/editDialogStyle.jsx";
import { primaryColor } from "assets/styles/material-dashboard-react.jsx";

// MARK: component

class EditPage extends React.Component {
  // MARK: constructor

  constructor(props) {
    super(props);

    this.state = {
      error: "",
      itemData: {}
    };
  }

  // MARK: update handler

  reloadState = 0;
  reloadCounter = 0;

  updateFormCallBack = (error, data = null, state = null) => {
    this.reloadCounter++;
    let currentCounter = this.reloadCounter;
    setTimeout(() => {
      if (this.reloadCounter === currentCounter) {
        this.setState(
          { itemData: data, itemState: state, error: error },
          () => {
            this.reloadState = currentCounter;
          }
        );
      }
    }, 500);
  };

  // MARK: render

  render() {
    const { classes } = this.props;

    return (
      <GridContainer justify="center">
        {this.props.state !== 0 ? (
          <div className={classes.paperDialog}>
            {this.props.state === 1 || this.props.state === 3 ? (
              <Card>
                <div className={classes.dialogContainer}>
                  <DialogContent className={classes.loadingTitle}>
                    <DialogContentText>
                      {this.props.state === 1
                        ? "Receiving information ..."
                        : "Saving information ..."}
                    </DialogContentText>
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
                </div>
              </Card>
            ) : (
              <Card>
                <CardHeader color="primary">
                  <div>
                    <div className={classes.cardTitleWhite}>
                      Editing information
                    </div>
                    <Button
                      className={classes.cancelButton}
                      onClick={() => {
                        this.props.handleCancel();
                      }}
                      color="danger"
                      autoFocus
                    >
                      Close
                    </Button>
                  </div>
                </CardHeader>
                <CardFooter className={classes.mainView}>
                  {React.createElement(this.props.editDialog, {
                    id: this.props.itemId,
                    data: this.props.itemData,
                    baseUrl: this.props.baseUrl,
                    baseFilter: this.props.baseFilter,
                    baseState:
                      this.props.itemData === null
                        ? this.state.itemState
                        : null,
                    enableEdit: this.props.enableEdit,
                    handleCancel: () => this.props.handleCancel(),
                    handleReload: () => this.props.handleReload(),
                    handleReloadPage: () => this.props.handleReloadPage(),
                    updateFormCallBack: (error, data = null, state = null) =>
                      this.updateFormCallBack(error, data, state)
                  })}
                </CardFooter>
                <CardFooter justify="left">
                  <div className={classes.bottomOptions}>
                    <div className={classes.errorText}>{this.state.error}</div>
                    {this.props.enableEdit ? (
                      <Button
                        className={classes.submitButton}
                        onClick={() => {
                          if (this.reloadCounter !== this.reloadState) {
                            return;
                          }
                          this.props.handleSubmit(
                            this.props.itemId,
                            this.state.itemData
                          );
                        }}
                        color="success"
                        autoFocus
                        disabled={this.state.itemData === null}
                      >
                        Save
                      </Button>
                    ) : null}
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>
        ) : null}
      </GridContainer>
    );
  }
}

// MARK: prop type validation

EditPage.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.number.isRequired,
  baseUrl: PropTypes.string,
  baseFilter: PropTypes.string,
  itemId: PropTypes.string,
  itemData: PropTypes.object,
  enableEdit: PropTypes.bool.isRequired,
  editDialog: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleReload: PropTypes.func.isRequired,
  handleReloadPage: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  EditPage,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  editDialogStyle
);
