// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
// MARK: ui imports
import Icon from "@material-ui/core/Icon";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
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

class PsychiatristProfilePage extends BasePage {
  constructor(props) {
    super(props);

    this.props.getProfile(
      this.props.user.profile.role,
      this.props.user.profile.id
    );

    downloadFile(props.user.profile.photo, "image", true, content => {
      this.onChangeHandler(content, "photo_uri", "raw");
    });

    let price_1 = null;
    if (
      props.user.profile.plans !== null &&
      props.user.profile.plans !== undefined &&
      props.user.profile.plans.length >= 1
    ) {
      price_1 = props.user.profile.plans[0].price;
    }

    let price_2 = null;
    if (
      props.user.profile.plans !== null &&
      props.user.profile.plans !== undefined &&
      props.user.profile.plans.length >= 2
    ) {
      price_2 = props.user.profile.plans[1].price;
    }

    let price_3 = null;
    if (
      props.user.profile.plans !== null &&
      props.user.profile.plans !== undefined &&
      props.user.profile.plans.length >= 3
    ) {
      price_3 = props.user.profile.plans[2].price;
    }

    this.state = {
      id: props.user.profile.id,
      role: props.user.profile.role,
      email: props.user.profile.email,
      first_name: props.user.profile.first_name,
      last_name: props.user.profile.last_name,
      age: props.user.profile.age,
      sex: props.user.profile.sex,
      photo: props.user.profile.photo,
      attachment: props.user.profile.attachment,
      birth_date: props.user.profile.birth_date,
      address: props.user.profile.address,
      post_code: props.user.profile.post_code,
      work_tel: props.user.profile.work_tel,
      home_tel: props.user.profile.home_tel,
      mobile: props.user.profile.mobile,
      primary_credential: props.user.profile.primary_credential,
      primary_specialty: props.user.profile.primary_specialty,
      applied_before: props.user.profile.applied_before,
      last_three_years_experiences:
        props.user.profile.last_three_years_experiences,
      name_of_posts_of_the_last_3_years:
        props.user.profile.name_of_posts_of_the_last_3_years,
      more_information: props.user.profile.more_information,
      price_1: price_1,
      price_2: price_2,
      price_3: price_3
    };
  }

  updateProfile = () => {
    if (
      this.checkIsEmptyTextWithNameError(this.state.first_name, "First Name") ||
      this.checkIsEmptyTextWithNameError(this.state.last_name, "Last Name") ||
      this.checkIsEmptyTextWithNameError(this.state.age, "Age") ||
      this.checkConditionWithError(
        parseInt(this.state.age) < 0,
        "The sex field is less than 1."
      ) ||
      this.checkIsEmptyTextWithNameError(this.state.sex, "Sex") ||
      this.checkIsEmptyTextWithNameError(this.state.birth_date, "Birth Date") ||
      this.checkIsEmptyTextWithNameError(this.state.address, "Address") ||
      this.checkIsEmptyTextWithNameError(this.state.post_code, "Post Code") ||
      this.checkIsEmptyTextWithNameError(this.state.home_tel, "Home Tel") ||
      this.checkIsEmptyTextWithNameError(this.state.mobile, "Mobile") ||
      this.checkIsEmptyTextWithNameError(
        this.state.primary_credential,
        "Primary Credential"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.primary_specialty,
        "Primary Specialty"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.last_three_years_experiences,
        "Last three years experiences"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.name_of_posts_of_the_last_3_years,
        "Name of posts of the last 3 years"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.price_1,
        "The price of a 30-minute session "
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.price_2,
        "The price of a 60-minute session "
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.price_3,
        "The price of a 90-minute session "
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
      attachment: this.state.attachment,
      birth_date: this.state.birth_date,
      address: this.state.address,
      post_code: this.state.post_code,
      work_tel: this.state.work_tel,
      home_tel: this.state.home_tel,
      mobile: this.state.mobile,
      primary_credential: this.state.primary_credential,
      primary_specialty: this.state.primary_specialty,
      applied_before: this.state.applied_before,
      last_three_years_experiences: this.state.last_three_years_experiences,
      name_of_posts_of_the_last_3_years: this.state
        .name_of_posts_of_the_last_3_years,
      more_information: this.state.more_information,
      plans: [
        {
          price: parseInt(this.state.price_1)
        },
        {
          price: parseInt(this.state.price_2)
        },
        {
          price: parseInt(this.state.price_3)
        }
      ]
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
                  <GridItem xs={12} sm={12} md={12}>
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
                  <GridItem xs={12} sm={6} md={6}>
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
                      labelText="Home Tel * (Mandatory)"
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
                      labelText="Mobile * (Mandatory)"
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
                      value={this.state.primary_credential}
                      labelText="Primary Credential * (Mandatory)"
                      id="primary_credential"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "primary_credential");
                        }
                      }}
                      items={[
                        "LCSW (Licensed Clinical Social Worker)",
                        "LICSW (Licensed Independent Clinical Social Worker)",
                        "LMFT (Licensed Mental Health Counselor)",
                        "LMHC (Licensed Mental Health Counselor)",
                        "LPC (Licensed Professional Counselor)",
                        "PHD",
                        "PSYD (The Doctorof Psychology)"
                      ]}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomSelect
                      value={this.state.primary_specialty}
                      labelText="Primary Specialty * (Mandatory)"
                      id="primary_specialty"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "primary_specialty");
                        }
                      }}
                      items={[
                        "Child Psychologist",
                        "Counselor",
                        "Psychiatrist",
                        "Psychologist"
                      ]}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.horizontal}>
                      {this.state.attachment !== "" ? (
                        <Button
                          onClick={() => {
                            downloadFile(
                              this.state.attachment,
                              this.state.id + ".zip"
                            );
                          }}
                          color="success"
                          className={classes.downloadButton}
                        >
                          <Icon color={"white"}>{"download"}</Icon>
                        </Button>
                      ) : null}
                      {this.state.attachment !== "" ? (
                        <Button
                          onClick={() => {
                            this.onChangeHandler("", "attachment", "raw");
                          }}
                          color="danger"
                          className={classes.downloadButton}
                        >
                          <Icon color={"white"}>{"delete"}</Icon>
                        </Button>
                      ) : null}
                      <CustomInput
                        value={
                          this.state.attachment === ""
                            ? "Zip the desired attachment and then upload."
                            : ""
                        }
                        labelText=""
                        id="type"
                        formControlProps={{
                          disabled: true,
                          fullWidth: true
                        }}
                      />
                      <Button
                        onClick={() => {
                          this.inputElement.click();
                        }}
                        color="success"
                        className={classes.selectButton}
                      >
                        <Icon color={"white"}>{"attachment"}</Icon>
                      </Button>
                      <input
                        id="attachment"
                        name="attachment"
                        type="file"
                        accept=".zip"
                        className={classes.fileInput}
                        ref={input => (this.inputElement = input)}
                        onChange={e => {
                          this.setState(() => ({ loadingDialogOpen: true }));
                          this.props.uploadFile(
                            this.state.id,
                            e.target.files[0],
                            "attachment",
                            response => {
                              this.onChangeHandler(
                                response.url,
                                "attachment",
                                "raw"
                              );
                              this.setState(() => ({
                                loadingDialogOpen: false
                              }));
                            },
                            () => {
                              this.setState(() => ({
                                loadingDialogOpen: false
                              }));
                            }
                          );
                          e.target.value = null;
                        }}
                      />
                    </div>
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
                      defaultValue={this.state.last_three_years_experiences}
                      labelText="Last three years experiences * (Mandatory)"
                      id="last_three_years_experiences"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(
                            e,
                            "last_three_years_experiences",
                            "text"
                          );
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={
                        this.state.name_of_posts_of_the_last_3_years
                      }
                      labelText="Name of posts of the last 3 years * (Mandatory)"
                      id="name_of_posts_of_the_last_3_years"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(
                            e,
                            "name_of_posts_of_the_last_3_years",
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
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.price_1}
                      labelText="The price of a 30-minute session * (Mandatory)"
                      id="price_1"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        onChange: e => {
                          this.onChangeHandler(e, "price_1", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.price_2}
                      labelText="The price of a 60-minute session * (Mandatory)"
                      id="price_2"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        onChange: e => {
                          this.onChangeHandler(e, "price_2", "text");
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      defaultValue={this.state.price_3}
                      labelText="The price of a 90-minute session * (Mandatory)"
                      id="price_3"
                      formControlProps={{
                        disabled: false,
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        onChange: e => {
                          this.onChangeHandler(e, "price_3", "text");
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

PsychiatristProfilePage.defaultProps = {
  app: {
    loading: 0
  },
  classes: {},
  updateProfile: () => {}
};

PsychiatristProfilePage.propTypes = {
  app: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  uploadFile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  PsychiatristProfilePage,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  profileStyle
);
