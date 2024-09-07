// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
// MARK: project imports
import { formatDateTime } from "helper/timeHelper.js";
import { connectComponent } from "helper/componentHelper.js";
// MARK: ui imports
import Pagination from "components/Pagination/Pagination.jsx";
import PersonHealthRecordDialog from "views/Person/HealthRecord/PersonHealthRecordDialog.jsx";

// MARK: component

function PersonHealthRecordsPage(props) {
  const { width } = props;

  return (
    <Pagination
      baseUrl={"/person/" + props.user.profile.id + "/document"}
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
      editDialog={PersonHealthRecordDialog}
      enableAdd={false}
      enableEdit={true}
      enableDelete={false}
    />
  );
}

// MARK: prop type validation

PersonHealthRecordsPage.propTypes = {
  user: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

// MARK: export

export default connectComponent(
  withWidth()(PersonHealthRecordsPage),
  [],
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  }
);
