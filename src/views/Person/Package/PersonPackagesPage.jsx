// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import Pagination from "components/Pagination/Pagination.jsx";
import PersonPackageDialog from "views/Person/Package/PersonPackageDialog.jsx";
// MARK: project imports
import { connectComponent } from "helper/componentHelper.js";

// MARK: component

function PersonPackagesPage(props) {
  const { width } = props;

  return (
    <Pagination
      baseUrl={"/person/" + props.user.profile.id + "/package"}
      title={"Packages"}
      tableSize={[12, 12, 12]}
      tableHead={
        isWidthUp("sm", width)
          ? [
              {
                name: "Organization",
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
                name: "Organization",
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
      getItemName={item => {
        return item.key;
      }}
      getItemRow={item => {
        return isWidthUp("sm", width)
          ? [
              {
                type: "text",
                value:
                  item.organization.name + " (" + item.organization.email + ")"
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
                value: item.organization.name
              },
              {
                type: "text",
                value: item.start_date
              }
            ];
      }}
      editDialog={PersonPackageDialog}
      enableAdd={false}
      enableEdit={false}
      enableDelete={false}
      enableSinglePage={true}
    />
  );
}

// MARK: prop type validation

PersonPackagesPage.propTypes = {
  user: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

// MARK: export

export default connectComponent(
  withWidth()(PersonPackagesPage),
  [],
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  }
);
