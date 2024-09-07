// MARK: library imports
import React from "react";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import { BaseFilterClass } from "components/Base/BaseFilter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import baseFilterStyle from "assets/styles/components/baseFilterStyle.jsx";

// MARK: component

class OrganizationPersonsFilter extends BaseFilterClass {
  // MARK: render

  render() {
    return (
      <div>
        {this.createSelectDialog()}
        <GridContainer>
          {this.createTextFilter("person", "Person Email", 9)}
          {this.createFilterButton()}
        </GridContainer>
      </div>
    );
  }
}

// MARK: export

export default connectComponentWithStyle(
  OrganizationPersonsFilter,
  [],
  function mapStateToProps() {
    return {};
  },
  baseFilterStyle
);
