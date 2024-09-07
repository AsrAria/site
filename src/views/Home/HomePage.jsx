// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: project imports
import * as actionCreators from "actions/user.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import homePageStyle from "assets/styles/views/homePageStyle.jsx";

// MARK: component

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingDialogOpen: false,
      eventDialogOpen: false
    };

    this.props.getProfile(
      this.props.user.profile.role,
      this.props.user.profile.id
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.mainCard}>
          <CardHeader color="primary">
            <div className={classes.cardTitleWhite}>Home page</div>
          </CardHeader>
          <CardBody className={classes.mainBody}>
            <div className={classes.titleText}>Psykon</div>
            <div className={classes.descriptionText}>
              Psykon application content management system.
            </div>
            {this.props.user.profile.is_confirmed === false ? (
              <div className={classes.errorText}>
                Your account has not been verified. You will be notified by
                email of the result of your account review.
              </div>
            ) : null}
          </CardBody>
        </Card>
      </div>
    );
  }
}

// MARK: prop type validation

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  HomePage,
  actionCreators,
  function mapStateToProps(state) {
    return {
      user: state.user
    };
  },
  homePageStyle
);
