// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import PaymentDialog from "views/Payment/PaymentDialog.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
// MARK: project imports
import { connectComponent } from "helper/componentHelper.js";

// MARK: component

function PaymentsPage() {
  return (
    <Pagination
      baseUrl={"/payment"}
      title={"Payments"}
      tableSize={[10, 11, 12]}
      tableHead={[
        {
          name: "Amount",
          size: null
        },
        {
          name: "Status",
          size: null
        }
      ]}
      getItemId={item => {
        return item.id;
      }}
      getItemName={() => {
        return "";
      }}
      getItemRow={item => {
        return [
          {
            type: "text",
            value: item.amount
          },
          {
            type: "text",
            value: ["In progress", "Success", "Unsuccess"][item.status]
          }
        ];
      }}
      editDialog={PaymentDialog}
      enableAdd={false}
      enableEdit={false}
      enableDelete={false}
      closeAfterCreate={false}
      enableSinglePage={true}
    />
  );
}

// MARK: prop type validation

PaymentsPage.propTypes = {
  admin: PropTypes.object.isRequired
};

// MARK: export

export default connectComponent(PaymentsPage, [], function mapStateToProps(
  state
) {
  return {
    app: state.app,
    admin: state.admin
  };
});
