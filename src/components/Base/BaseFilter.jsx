// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import ListItem from "@material-ui/core/ListItem";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import SelectDialog from "components/Dialog/SelectDialog.jsx";
import baseFilterStyle from "assets/styles/components/baseFilterStyle.jsx";

// MARK: component

var ReactComponent = React.Component;
class BaseFilter extends ReactComponent {
  filters = [];

  constructor(props) {
    super(props);

    this.initState();
  }

  initState = () => {
    this.state = {};
    this.initSelectItemState();
  };

  // MARK: helper

  isEmptyString = value => {
    return value === "" || value === null || value === undefined;
  };

  onChangeHandler = (e, name, type = "value") => {
    let state = {};
    var data = "";

    if (type === "raw") {
      data = e;
    }
    if (type === "value") {
      data = e.target.value;
    }
    if (type === "check") {
      data = e.target.checked;
    }

    state[name] = data;
    this.setState(state);
  };

  // MARK: filter

  filter = () => {
    this.props.updateFilter(this.createFilter());
  };

  createFilter = () => {
    var filter = "";
    for (var name of this.filters) {
      if (!this.isEmptyString(this.state[name])) {
        if (
          this.state[name + "_key"] !== "___" &&
          this.state[name + "_key"] !== undefined
        ) {
          filter += "&" + name + "=" + this.state[name + "_key"];
        } else if (this.state[name + "_key"] !== "___") {
          filter += "&" + name + "=" + this.state[name];
        }
      }
    }
    return filter;
  };

  // MARK: select item

  initSelectItemState = () => {
    this.state.selectDialogOpen = false;
    this.state.selectDialogTag = "";
    this.state.selectDialogTitle = "";
    this.state.selectDialogBaseUrl = "";
  };

  // eslint-disable-next-line no-unused-vars
  handleSelectItem = (id, name, data) => {
    var state = {
      selectDialogOpen: false
    };

    var tag = this.state.selectDialogTag;
    state[tag] = id;
    state[tag + "_name"] = name;

    this.setState(() => state);
  };

  handleOpenSelectDialog = (tag, title, baseUrl) => {
    this.setState(() => ({
      selectDialogOpen: true,
      selectDialogTag: tag,
      selectDialogTitle: title,
      selectDialogBaseUrl: baseUrl
    }));
  };

  createSelectDialog(getName = null, getItem = null) {
    return (
      <SelectDialog
        open={this.state.selectDialogOpen}
        title={this.state.selectDialogTitle}
        baseUrl={this.state.selectDialogBaseUrl}
        handleSelect={(id, name, data) => {
          this.handleSelectItem(id, name, data);
        }}
        handleCancel={() => {
          this.setState(() => ({
            selectDialogOpen: false
          }));
        }}
        getHeader={() => {
          return [
            {
              name: getName === null ? "Name" : getName(),
              size: null
            }
          ];
        }}
        getItemRow={item => {
          return [
            {
              type: "text",
              value: getItem === null ? item.name : getItem(item)
            }
          ];
        }}
      />
    );
  }

  // MARK: ui functions

  createFilterButton(size = 3) {
    return (
      <GridItem xs={size} sm={size} md={size}>
        <Button
          onClick={() => {
            this.filter();
          }}
          color="success"
          className={this.props.classes.filterButton}
        >
          Filter
        </Button>
      </GridItem>
    );
  }

  createTextFilter(name, displayName, size) {
    if (this.filters.indexOf(name) === -1) {
      this.filters.push(name);
    }

    return (
      <GridItem xs={size} sm={size} md={size}>
        <CustomInput
          value={this.state[name] !== undefined ? this.state[name] : ""}
          labelText={displayName}
          id={name}
          formControlProps={{
            disabled: false,
            fullWidth: true
          }}
          inputProps={{
            onChange: e => {
              this.onChangeHandler(e, name);
            }
          }}
          onEnter={this.filter}
        />
      </GridItem>
    );
  }

  createSelectFilter(name, displayName, types, size) {
    if (this.filters.indexOf(name) === -1) {
      this.filters.push(name);
    }

    var type_names = ["Default"];
    for (var type of types) {
      type_names.push(type.name);
    }

    return (
      <GridItem xs={size} sm={size} md={size}>
        <CustomSelect
          value={this.state[name] !== undefined ? this.state[name] : 0}
          labelText={displayName}
          id={name}
          formControlProps={{
            disabled: false,
            fullWidth: true
          }}
          inputProps={{
            onChange: e => {
              this.onChangeHandler(e, name);
              var value = e.target.value - 1;
              if (value < 0) {
                this.state[name + "_key"] = "___";
              } else {
                this.state[name + "_key"] = types[value].key;
              }
            }
          }}
          items={type_names}
        />
      </GridItem>
    );
  }

  createObjectFilter(name, displayName, serverName, size) {
    if (this.filters.indexOf(name) === -1) {
      this.filters.push(name);
    }

    return (
      <GridItem xs={size} sm={size} md={size}>
        <ListItem className={this.props.classes.listItem}>
          <Button
            onClick={() => {
              this.handleOpenSelectDialog(
                name,
                "Select " + displayName,
                serverName
              );
            }}
            color="warning"
            className={this.props.classes.selectButton}
          >
            Select
          </Button>
          <CustomInput
            value={this.state[name] !== undefined ? this.state[name].name : ""}
            labelText={
              this.state[name] !== undefined
                ? this.state[name + "_name"]
                : displayName
            }
            id={name}
            formControlProps={{
              disabled: true,
              fullWidth: true
            }}
          />
        </ListItem>
      </GridItem>
    );
  }

  // MARK: render

  render() {
    return (
      <div>
        {this.createSelectDialog()}
        <GridContainer>
          {this.createTextFilter("query", "Search", 9)}
          {this.createFilterButton()}
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

BaseFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  BaseFilter,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  baseFilterStyle
);

export const BaseFilterClass = BaseFilter;
