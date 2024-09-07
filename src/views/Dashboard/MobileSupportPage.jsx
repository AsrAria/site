// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import mobileSupportPageStyle from "assets/styles/views/mobileSupportPageStyle.jsx";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";

// MARK: component

class MobileSupportPage extends React.Component {
  // MARK: render

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={8}>
            <Card className={classes.mainCard}>
              <CardHeader color="danger">
                <div className={classes.cardTitleWhite}>Error</div>
              </CardHeader>
              <CardBody className={classes.mainBody}>
                <div className={classes.titleText}>Psykon</div>
                <div className={classes.descriptionText}>
                  Psykon does not support mobile screens. To continue working,
                  go to the web browser on the desktop device.
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

MobileSupportPage.propTypes = {
  app: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  MobileSupportPage,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  mobileSupportPageStyle
);
