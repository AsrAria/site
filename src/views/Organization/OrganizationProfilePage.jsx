// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
// MARK: ui imports
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
// MARK: project ui import
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import BasePage from "views/Base/BasePage";
import profileStyle from "assets/styles/views/profileStyle.jsx";
// MARK: project imports
import * as actionCreators from "actions/user.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";

// MARK: component

class OrganizationProfilePage extends BasePage {
  constructor(props) {
    super(props);

    this.props.getProfile(
      this.props.user.profile.role,
      this.props.user.profile.id
    );

    this.state = {
      id: props.user.profile.id,
      role: props.user.profile.role,
      name: props.user.profile.name,
      email: props.user.profile.email,
      field_of_activity: props.user.profile.field_of_activity,
      manager_name: props.user.profile.manager_name,
      operator_name: props.user.profile.operator_name,
      address: props.user.profile.address,
      post_code: props.user.profile.post_code,
      work_tel: props.user.profile.work_tel,
      work_fax: props.user.profile.work_fax,
      purpose_for_taking_the_test:
        props.user.profile.purpose_for_taking_the_test,
      number_of_staff: props.user.profile.number_of_staff,
      applied_before: props.user.profile.applied_before,
      more_information: props.user.profile.more_information
    };
  }

  updateProfile = () => {
    if (
      this.checkIsEmptyTextWithNameError(this.state.name, "Name") ||
      this.checkIsEmptyTextWithNameError(
        this.state.field_of_activity,
        "Field of Activity"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.manager_name,
        "Manager Full Name"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.operator_name,
        "Operator Full Name"
      ) ||
      this.checkIsEmptyTextWithNameError(this.state.address, "Address") ||
      this.checkIsEmptyTextWithNameError(this.state.post_code, "Post Code") ||
      this.checkIsEmptyTextWithNameError(this.state.work_tel, "Work Tel") ||
      this.checkIsEmptyTextWithNameError(
        this.state.number_of_staff,
        "Number of staff"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.purpose_for_taking_the_test,
        "Purpose for taking the test"
      )
    ) {
      return;
    }

    var data = {
      name: this.state.name,
      field_of_activity: this.state.field_of_activity,
      manager_name: this.state.manager_name,
      operator_name: this.state.operator_name,
      address: this.state.address,
      post_code: this.state.post_code,
      work_tel: this.state.work_tel,
      work_fax: this.state.work_fax,
      purpose_for_taking_the_test: this.state.purpose_for_taking_the_test,
      number_of_staff: parseInt(this.state.number_of_staff),
      applied_before: this.state.applied_before,
      more_information: this.state.more_information
    };

    this.props.updateProfile(this.state.role, this.state.id, data);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <div>
                  <div className={classes.cardTitleWhite}>Edit account</div>
                  {this.props.app.loading > 0 ? (
                    <ReactLoading
                      className={classes.loadingItem}
                      type={"spin"}
                      height={30}
                      width={30}
                    />
                  ) : null}
                </div>
              </CardHeader>
              <CardBody>
                {!this.props.user.profile.is_profile_updated ? (
                  <p>
                    To use the account, you must first complete the basic
                    information of your profile.
                  </p>
                ) : null}
                <GridContainer>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      value={this.state.email}
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        disabled: true,
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      value={-this.props.user.profile.balance}
                      labelText="Balance"
                      id="balance"
                      formControlProps={{
                        disabled: true,
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.name}
                      labelText="Name * (Mandatory)"
                      id="name"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "name", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.field_of_activity}
                      labelText="Field of Activity * (Mandatory)"
                      id="field_of_activity"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "field_of_activity", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      defaultValue={this.state.manager_name}
                      labelText="Manager Full Name * (Mandatory)"
                      id="manager_name"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "manager_name", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      defaultValue={this.state.operator_name}
                      labelText="Operator Full Name * (Mandatory)"
                      id="operator_name"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "operator_name", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.address}
                      labelText="Address * (Mandatory)"
                      id="address"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 3,
                        onChange: e => {
                          this.onChangeHandler(e, "address", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      defaultValue={this.state.post_code}
                      labelText="Post Code * (Mandatory)"
                      id="post_code"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "post_code", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      defaultValue={this.state.work_tel}
                      labelText="Work Tel * (Mandatory)"
                      id="work_tel"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "work_tel", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      defaultValue={this.state.work_fax}
                      labelText="Work Fax"
                      id="work_fax"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "work_fax", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.number_of_staff}
                      labelText="Number of Staff * (Mandatory)"
                      id="number_of_staff"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        onChange: e => {
                          this.onChangeHandler(e, "number_of_staff", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={this.props.classes.checkItem}>
                      <label className={this.props.classes.checkTitle}>
                        Applied before *
                      </label>
                      <Checkbox
                        className={this.props.classes.checkBox}
                        checked={this.state.applied_before}
                        disabled={false}
                        onChange={e => {
                          this.onChangeHandler(e, "applied_before", "check");
                        }}
                        checkedIcon={
                          <Check className={this.props.classes.checkedIcon} />
                        }
                        icon={
                          <Check className={this.props.classes.uncheckedIcon} />
                        }
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.purpose_for_taking_the_test}
                      labelText="Purpose for taking the test * (Mandatory)"
                      id="purpose_for_taking_the_test"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(
                            e,
                            "purpose_for_taking_the_test",
                            "text"
                          );
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.more_information}
                      labelText="More Information"
                      id="more_information"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        onChange: e => {
                          this.onChangeHandler(e, "more_information", "text");
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter justify="left">
                <div className={classes.bottomOptions}>
                  <Button
                    className={classes.submitButton}
                    color="primary"
                    onClick={this.updateProfile}
                  >
                    Save
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

OrganizationProfilePage.defaultProps = {
  app: {
    loading: 0
  },
  classes: {},
  updateProfile: () => {}
};

OrganizationProfilePage.propTypes = {
  app: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  OrganizationProfilePage,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  profileStyle
);
