// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import OrganizationPersonDialog from "views/Organization/Person/OrganizationPersonDialog.jsx";
import OrganizationPersonsFilter from "views/Organization/Person/OrganizationPersonsFilter.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
// MARK: project imports
import { connectComponent } from "helper/componentHelper.js";

// MARK: component

function OrganizationPackagesPage(props) {
  const { width } = props;

  return (
    <Pagination
      baseUrl={"/organization/" + props.user.profile.id + "/person"}
      title={"Persons"}
      tableSize={[12, 12, 12]}
      tableHead={
        isWidthUp("sm", width)
          ? [
              {
                name: "Name",
                size: null
              },
              {
                name: "Email",
                size: null
              }
            ]
          : [
              {
                name: "Email",
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
                value: item.name
              },
              {
                type: "text",
                value: item.email
              }
            ]
          : [
              {
                type: "text",
                value: item.email
              }
            ];
      }}
      editDialog={OrganizationPersonDialog}
      filterComponent={OrganizationPersonsFilter}
      enableAdd={false}
      enableEdit={false}
      enableDelete={false}
    />
  );
}

// MARK: prop type validation

OrganizationPackagesPage.propTypes = {
  user: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

// MARK: export

export default connectComponent(
  withWidth()(OrganizationPackagesPage),
  [],
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  }
);
