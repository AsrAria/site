// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
// MARK: project imports
import { formatDateTime } from "helper/timeHelper.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
import OrganizationPersonHealthRecortDialog from "views/Organization/Person/OrganizationPersonHealthRecortDialog.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";

// MARK: component

class OrganizationPersonDialog extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
  }

  createBaseState = () => {
    return {
      id: "",
      email: "",
      name: ""
    };
  };

  createDataState = () => {
    return this.data;
  };

  updateData = () => {};

  render() {
    const { width } = this.props;

    return (
      <div style={{ width: "800px" }}>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <CustomInput
              defaultValue={this.state.email}
              labelText="Eamil"
              id="email"
              formControlProps={{
                disabled: true,
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <CustomInput
              defaultValue={this.state.name}
              labelText="Name"
              id="name"
              formControlProps={{
                disabled: true,
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Pagination
              baseUrl={this.props.baseUrl + "/" + this.state.id + "/document"}
              title={"Health Records"}
              tableSize={[12, 12, 12]}
              tableHead={
                isWidthUp("sm", width)
                  ? [
                      {
                        name: "Type",
                        size: null
                      },
                      {
                        name: "Creator",
                        size: null
                      },
                      {
                        name: "Time",
                        size: null
                      }
                    ]
                  : [
                      {
                        name: "Type",
                        size: null
                      },
                      {
                        name: "Time",
                        size: null
                      }
                    ]
              }
              getItemId={item => {
                return item.id;
              }}
              getItemName={item => {
                return item.key;
              }}
              getItemRow={item => {
                return isWidthUp("sm", width)
                  ? [
                      {
                        type: "text",
                        value: item.type === 0 ? "Test" : "Meeting"
                      },
                      {
                        type: "text",
                        value: item.creator.name
                      },
                      {
                        type: "text",
                        value: formatDateTime(item.create_time)
                      }
                    ]
                  : [
                      {
                        type: "text",
                        value: item.type === 0 ? "Test" : "Meeting"
                      },
                      {
                        type: "text",
                        value: formatDateTime(item.create_time)
                      }
                    ];
              }}
              editDialog={OrganizationPersonHealthRecortDialog}
              enableAdd={false}
              enableEdit={false}
              enableDelete={false}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

OrganizationPersonDialog.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  withWidth()(OrganizationPersonDialog),
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  dialogStyle
);
