// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: project ui imports
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import OrganizationPackageDialog from "views/Organization/Package/OrganizationPackageDialog.jsx";
import OrganizationPackagesFilter from "views/Organization/Package/OrganizationPackagesFilter.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
// MARK: project imports
import { connectComponent } from "helper/componentHelper.js";

// MARK: component

function OrganizationPackagesPage(props) {
  const { width } = props;

  return (
    <Pagination
      baseUrl={"/organization/" + props.user.profile.id + "/package"}
      title={"Packages"}
      tableSize={[12, 12, 12]}
      tableHead={
        isWidthUp("sm", width)
          ? [
              {
                name: "Person",
                size: null
              },
              {
                name: "Start",
                size: null
              },
              {
                name: "End",
                size: null
              },
              {
                name: "Budget",
                size: null
              },
              {
                name: "Balance",
                size: null
              }
            ]
          : [
              {
                name: "Person",
                size: null
              },
              {
                name: "Start",
                size: "80px"
              }
            ]
      }
      getItemId={item => {
        return item.id;
      }}
      getItemName={() => {
        return "Package";
      }}
      getItemRow={item => {
        return isWidthUp("sm", width)
          ? [
              {
                type: "text",
                value: item.person.name + " (" + item.person.email + ")"
              },
              {
                type: "text",
                value: item.start_date
              },
              {
                type: "text",
                value: item.end_date
              },
              {
                type: "text",
                value: item.budget
              },
              {
                type: "text",
                value: item.balance
              }
            ]
          : [
              {
                type: "text",
                value: item.person.name
              },
              {
                type: "text",
                value: item.start_date
              }
            ];
      }}
      addDialog={OrganizationPackageDialog}
      editDialog={OrganizationPackageDialog}
      filterComponent={OrganizationPackagesFilter}
      enableAdd={true}
      enableEdit={false}
      enableDelete={true}
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
