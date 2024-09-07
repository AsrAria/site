// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
// MARK: project ui imports
import BaseFilter from "components/Base/BaseFilter.jsx";
import SelectDialog from "components/Dialog/SelectDialog.jsx";
import LoadingDialog from "components/Dialog/LoadingDialog.jsx";
import GregorianDatePicker from "components/Calendar/GregorianDatePicker.jsx";

// MARK: component

var ReactComponent = React.Component;
class BaseDialog extends ReactComponent {
  // MARK: init dialog

  constructor(props) {
    super(props);

    this.data = this.props.data;
    this.baseUrl = this.props.baseUrl;
  }

  componentDidMount() {
    setTimeout(() => {
      document.getElementById("dashboard-header").scrollIntoView();
    }, 0);
  }

  initState = () => {
    this.initBaseSate();
    this.initDataState();
    this.updateData();
  };

  initBaseSate = () => {
    if (this.props.baseState) {
      this.state = this.props.baseState;
    } else {
      this.state = this.createBaseState();
      this.initSelectItemState();
    }
  };

  initDataState = () => {
    if (this.data && !this.isEmptyObject(this.data)) {
      var data = this.createDataState();
      for (var key in data) {
        this.state[key] = data[key];
      }
    }
  };

  updateData = () => {};
  createBaseState = () => {};
  createDataState = () => {};

  // MARK: helper functions

  isCreateMode = () => {
    return this.isEmptyString(this.props.id);
  };

  isEmptyString = value => {
    return value === "" || value === null || value === undefined;
  };

  isEmptyObject = value => {
    return Object.keys(value).length === 0;
  };

  checkConditionWithError = (value, error) => {
    if (value) {
      this.props.updateFormCallBack(error);
      return true;
    }
    return false;
  };

  checkPatternWithNameError = (pattern, value, name) => {
    return this.checkConditionWithError(
      !pattern.test(value),
      name + " is incorrect."
    );
  };

  checkIsEmptyTextWithError = (value, error) => {
    return this.checkConditionWithError(this.isEmptyString(value), error);
  };

  checkIsEmptyTextWithNameError = (value, name) => {
    return this.checkConditionWithError(
      this.isEmptyString(value),
      name + " must not be empty."
    );
  };

  // MARK: change handler

  reloadItem = "";
  reloadCounter = 0;

  onChangeHandler = (e, name, type = "value") => {
    let newState = {};

    var data = "";
    var names = name.split(".");

    if (type === "raw") {
      data = e;
    }
    if (type === "text") {
      data = e.target.value;
    }
    if (type === "value") {
      data = e.target.value;
    }
    if (type === "file") {
      data = e.target.files[0];
      e.target.value = null;
    }
    if (type === "check") {
      data = e.target.checked;
    }

    if (names.length === 1) {
      newState[names[0]] = data;
    }

    if (names.length === 2) {
      try {
        newState[names[0]] = this.state[names[0]];
      } catch (e) {
        newState[names[0]] = {};
      }
      newState[names[0]][names[1]] = data;
    }

    if (type === "text") {
      this.reloadItem = name;
      let currentItem = this.reloadItem;
      this.reloadCounter++;
      let currentCounter = this.reloadCounter;
      setTimeout(() => {
        if (
          this.reloadCounter === currentCounter ||
          this.reloadItem !== currentItem
        ) {
          this.setState(newState, () => {
            this.updateData();
          });
        }
      }, 500);
    } else {
      this.setState(newState, () => {
        this.updateData();
      });
    }
  };

  // MARK: select item

  initSelectItemState = () => {
    this.state.selectDialogOpen = false;
    this.state.selectDialogTag = "";
    this.state.selectDialogTitle = "";
    this.state.selectDialogBaseUrl = "";
    this.state.selectDialogFilter = BaseFilter;
  };

  handleSelectItem = (id, name, data) => {
    var state = {
      selectDialogOpen: false
    };

    var tag = this.state.selectDialogTag;
    var type = this.state.selectDialogType;
    var callBack = this.state.selectDialogCallBack;

    if (type === "object") {
      state[tag] = {};
      state[tag].id = id;
      state[tag].name = name;
      state[tag].data = data;
    } else {
      for (var tmp of this.state[tag]) {
        if (tmp.id === id) {
          toast.error("This item is in the list.");
          return;
        }
      }

      state[tag] = this.state[tag];
      state[tag].push({
        id: id,
        name: name,
        data: data
      });
    }

    this.setState(
      () => state,
      () => {
        this.updateData();
        if (callBack !== null) callBack();
      }
    );
  };

  handleOpenSelectDialog = (
    callBack,
    tag,
    type,
    title,
    baseUrl,
    filter = BaseFilter
  ) => {
    this.setState(() => ({
      selectDialogOpen: true,
      selectDialogTag: tag,
      selectDialogType: type,
      selectDialogTitle: title,
      selectDialogBaseUrl: baseUrl,
      selectDialogCallBack: callBack,
      selectDialogFilter: filter
    }));
  };

  // MARK: ui functions

  createLoadingDialog() {
    return (
      <LoadingDialog
        open={this.state.loadingDialogOpen}
        title={"Loading"}
        description={"Please wait a moment ..."}
      />
    );
  }

  createSelectDialog(
    getName = null,
    getItem = null,
    baseFilter = "",
    filterComponent = undefined
  ) {
    return (
      <SelectDialog
        open={this.state.selectDialogOpen}
        title={this.state.selectDialogTitle}
        baseUrl={this.state.selectDialogBaseUrl}
        baseFilter={baseFilter}
        filterComponent={filterComponent}
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

  createCalendarInput(name, title) {
    var names = name.split(".");

    return (
      <GregorianDatePicker
        date={
          names.length === 1
            ? this.state[names[0]]
            : this.state[names[0]][names[1]]
        }
        onChange={e => {
          this.onChangeHandler(e, name, "raw");
        }}
        title={title}
      />
    );
  }
}

// MARK: prop type validation

BaseDialog.defaultProps = {
  baseUrl: ""
};

BaseDialog.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object,
  baseState: PropTypes.object,
  baseUrl: PropTypes.string.baseUrl
};

// MARK: export

export default BaseDialog;
