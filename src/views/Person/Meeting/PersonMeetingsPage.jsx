// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
// MARK: project ui import
import Pagination from "components/Pagination/Pagination.jsx";
import BasePage from "views/Base/BasePage";
import PersonMeetingDialog from "views/Person/Meeting/PersonMeetingDialog.jsx";
import profileStyle from "assets/styles/views/profileStyle.jsx";
// MARK: project imports
import { formatDateTime } from "helper/timeHelper.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";

// MARK: component

class PersonMeetingsPage extends BasePage {
  render() {
    const { width } = this.props;

    return (
      <Pagination
        baseUrl={"/person/" + this.props.user.profile.id + "/meeting"}
        title={"Meetings"}
        tableSize={[12, 12, 12]}
        tableHead={
          isWidthUp("sm", width)
            ? [
                {
                  name: "Psychiatrist",
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
                  name: "Status",
                  size: null
                },
                {
                  name: "",
                  size: "20px"
                }
              ]
            : [
                {
                  name: "Psychiatrist",
                  size: null
                },
                {
                  name: "Status",
                  size: null
                },
                {
                  name: "",
                  size: "20px"
                }
              ]
        }
        getItemId={item => {
          return item.id;
        }}
        getItemName={() => {
          return "Meeting";
        }}
        getItemRow={item => {
          return isWidthUp("sm", width)
            ? [
                {
                  type: "text",
                  value: item.psychiatrist.name
                },
                {
                  type: "text",
                  value: formatDateTime(item.start_time)
                },
                {
                  type: "text",
                  value: formatDateTime(item.end_time)
                },
                {
                  type: "text",
                  value: ["New", "Accepted", "Rejected", "Completed"][
                    item.status
                  ]
                },
                {
                  type: "button",
                  icon: item.person_have_notification
                    ? "notifications_active"
                    : "notifications_none",
                  color: "primary",
                  handle: () => {}
                }
              ]
            : [
                {
                  type: "text",
                  value: item.psychiatrist.name
                },
                {
                  type: "text",
                  value: ["New", "Accepted", "Rejected", "Completed"][
                    item.status
                  ]
                },
                {
                  type: "button",
                  icon: item.person_have_notification
                    ? "notifications_active"
                    : "notifications_none",
                  color: "primary",
                  handle: () => {}
                }
              ];
        }}
        editDialog={PersonMeetingDialog}
        enableAdd={false}
        enableEdit={true}
        enableDelete={false}
      />
    );
  }
}

// MARK: prop type validation

PersonMeetingsPage.defaultProps = {
  app: {
    loading: 0
  },
  classes: {}
};

PersonMeetingsPage.propTypes = {
  app: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  withWidth()(PersonMeetingsPage),
  [],
  function mapStateToProps(state) {
    return {
      app: state.app,
      user: state.user
    };
  },
  profileStyle
);
