// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
// MARK: project ui import
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GregorianDatePicker from "components/Calendar/GregorianDatePicker.jsx";
import BasePage from "views/Base/BasePage";
import profileStyle from "assets/styles/views/profileStyle.jsx";
// MARK: project imports
import * as actionCreators from "actions/user.js";
import { downloadFile } from "helper/restHelper.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";

// MARK: component

class PersonProfilePage extends BasePage {
  constructor(props) {
    super(props);

    this.props.getProfile(
      this.props.user.profile.role,
      this.props.user.profile.id
    );

    downloadFile(props.user.profile.photo, "image", true, content => {
      this.onChangeHandler(content, "photo_uri", "raw");
    });

    this.state = {
      id: props.user.profile.id,
      role: props.user.profile.role,
      email: props.user.profile.email,
      first_name: props.user.profile.first_name,
      last_name: props.user.profile.last_name,
      age: props.user.profile.age,
      sex: props.user.profile.sex,
      photo: props.user.profile.photo,
      birth_date: props.user.profile.birth_date,
      address: props.user.profile.address,
      post_code: props.user.profile.post_code,
      work_tel: props.user.profile.work_tel,
      home_tel: props.user.profile.home_tel,
      mobile: props.user.profile.mobile,
      duration_of_hospitalization:
        props.user.profile.duration_of_hospitalization,
      illness_severity: props.user.profile.illness_severity,
      disease_background: props.user.profile.disease_background,
      family_disease_background: props.user.profile.family_disease_background,
      history_of_drug_use: props.user.profile.history_of_drug_use,
      family_history_of_drug_use: props.user.profile.family_history_of_drug_use,
      birth_order: props.user.profile.birth_order,
      number_of_children_in_family:
        props.user.profile.number_of_children_in_family,
      more_information: props.user.profile.more_information
    };
  }

  updateProfile = () => {
    if (
      this.checkIsEmptyTextWithNameError(this.state.first_name, "First Name") ||
      this.checkIsEmptyTextWithNameError(this.state.last_name, "Last Name") ||
      this.checkIsEmptyTextWithNameError(this.state.age, "Age") ||
      this.checkIsEmptyTextWithNameError(this.state.sex, "Sex") ||
      this.checkConditionWithError(
        parseInt(this.state.age) < 0,
        "The sex field is less than 1."
      ) ||
      this.checkIsEmptyTextWithNameError(this.state.birth_date, "Birth Date") ||
      this.checkIsEmptyTextWithNameError(
        this.state.duration_of_hospitalization,
        "Duration of Hospitalization"
      ) ||
      this.checkConditionWithError(
        parseInt(this.state.birth_order) < 0,
        "The birth order field is less than 1."
      ) ||
      this.checkConditionWithError(
        parseInt(this.state.number_of_children_in_family) < 0,
        "The number of children in family field is less than 1."
      )
    ) {
      return;
    }

    var data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      age: parseInt(this.state.age),
      sex: this.state.sex,
      photo: this.state.photo,
      birth_date: this.state.birth_date,
      address: this.state.address,
      post_code: this.state.post_code,
      work_tel: this.state.work_tel,
      home_tel: this.state.home_tel,
      mobile: this.state.mobile,
      duration_of_hospitalization: this.state.duration_of_hospitalization,
      illness_severity: this.state.illness_severity,
      disease_background: this.state.disease_background,
      family_disease_background: this.state.family_disease_background,
      history_of_drug_use: this.state.history_of_drug_use,
      family_history_of_drug_use: this.state.family_history_of_drug_use,
      more_information: this.state.more_information
    };

    if (this.state.birth_order != null && this.state.birth_order !== "") {
      data.birth_order = parseInt(this.state.birth_order);
    }

    if (
      this.state.number_of_children_in_family != null &&
      this.state.number_of_children_in_family !== ""
    ) {
      data.number_of_children_in_family = parseInt(
        this.state.number_of_children_in_family
      );
    }

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
                  <GridItem xs={12} sm={8} md={9}>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          defaultValue={this.state.first_name}
                          labelText="First Name * (Mandatory)"
                          id="first_name"
                          formControlProps={{
                            disabled: false,
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: e => {
                              this.onChangeHandler(e, "first_name", "text");
                            }
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          defaultValue={this.state.last_name}
                          labelText="Last Name * (Mandatory)"
                          id="last_name"
                          formControlProps={{
                            disabled: false,
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: e => {
                              this.onChangeHandler(e, "last_name", "text");
                            }
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          defaultValue={this.state.age}
                          labelText="Age * (Mandatory)"
                          id="age"
                          formControlProps={{
                            disabled: false,
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "number",
                            onChange: e => {
                              this.onChangeHandler(e, "age", "text");
                            }
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomSelect
                          value={this.state.sex}
                          labelText="Sex * (Mandatory)"
                          id="sex"
                          formControlProps={{
                            disabled: false,
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: e => {
                              this.onChangeHandler(e, "sex");
                            }
                          }}
                          items={["Male", "Female", "Other"]}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <GregorianDatePicker
                          date={this.state["birth_date"]}
                          onChange={e => {
                            this.onChangeHandler(e, "birth_date", "raw");
                          }}
                          title={"Birth Date * (Mandatory)"}
                        />
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <p className={this.props.classes.imageTitle}>Photo</p>
                    {this.createImageInput("photo")}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.address}
                      labelText="Address"
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
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      defaultValue={this.state.post_code}
                      labelText="Post Code"
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
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      defaultValue={this.state.work_tel}
                      labelText="Work Tel"
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
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      defaultValue={this.state.home_tel}
                      labelText="Home Tel"
                      id="home_tel"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "home_tel", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      defaultValue={this.state.mobile}
                      labelText="Mobile"
                      id="mobile"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "mobile", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomSelect
                      value={this.state.duration_of_hospitalization}
                      labelText="Duration of Hospitalization * (Mandatory)"
                      id="duration_of_hospitalization"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(
                            e,
                            "duration_of_hospitalization"
                          );
                        }
                      }}
                      items={[
                        "OutPatient",
                        "Less than 1 Week",
                        "1-4 Weeks",
                        "More then 4 Weeks",
                        "None",
                        "Unknown"
                      ]}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      defaultValue={this.state.illness_severity}
                      labelText="Illness Severity"
                      id="illness_severity"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "illness_severity", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.disease_background}
                      labelText="Disease Background"
                      id="disease_background"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "disease_background", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.family_disease_background}
                      labelText="Family's Disease Background"
                      id="family_disease_background"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(
                            e,
                            "family_disease_background",
                            "text"
                          );
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.history_of_drug_use}
                      labelText="History of Genetic problem, Mental problem or any Medication"
                      id="history_of_drug_use"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(
                            e,
                            "history_of_drug_use",
                            "text"
                          );
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.family_history_of_drug_use}
                      labelText="Family's History of Genetic problem, Mental problem or any Medication"
                      id="family_history_of_drug_use"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(
                            e,
                            "family_history_of_drug_use",
                            "text"
                          );
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      defaultValue={this.state.birth_order}
                      labelText="Birth Order"
                      id="birth_order"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        onChange: e => {
                          this.onChangeHandler(e, "birth_order", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      defaultValue={this.state.number_of_children_in_family}
                      labelText="Number of Children in Family"
                      id="number_of_children_in_family"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        onChange: e => {
                          this.onChangeHandler(
                            e,
                            "number_of_children_in_family",
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

PersonProfilePage.defaultProps = {
  app: {
    loading: 0
  },
  classes: {},
  updateProfile: () => {}
};

PersonProfilePage.propTypes = {
  app: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  PersonProfilePage,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  profileStyle
);
