// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import DraggableList from "components/Draggable/DraggableList.jsx";
import draggableListStyle from "assets/styles/components/draggableListStyle.jsx";

// MARK: component

class DraggableChipList extends React.Component {
  handleDeleteItem = id => {
    var items = [];
    for (var item of this.props.items) if (item.id !== id) items.push(item);
    this.props.itemsChangeHandler(items);
  };

  render() {
    const { classes } = this.props;

    return (
      <Card
        className={classes.chipBox}
        style={Object.assign(
          {},
          this.props.styles.root !== undefined ? this.props.styles.root : {}
        )}
      >
        <DraggableList
          items={this.props.items}
          type={this.props.type}
          getItemComponent={(isDragging, item) => {
            return (
              <Chip
                key={item.id}
                label={this.props.getItemName(item)}
                onDelete={
                  this.props.enableDelete
                    ? () => {
                        this.handleDeleteItem(item.id);
                      }
                    : null
                }
                className={
                  isDragging ? classes.chipItemSelected : classes.chipItem
                }
                style={this.props.itemStyle}
              />
            );
          }}
          itemsChangeHandler={this.props.itemsChangeHandler}
        />
      </Card>
    );
  }
}

// MARK: prop type validation

DraggableChipList.defaultProps = {
  styles: {},
  items: [],
  type: "vertical",
  enableDelete: true,
  getItemName: item => {
    return item.name;
  },
  itemsChangeHandler: () => {},
  itemStyle: {}
};

DraggableChipList.propTypes = {
  classes: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  enableDelete: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  getItemName: PropTypes.func.isRequired,
  itemsChangeHandler: PropTypes.func.isRequired,
  itemStyle: PropTypes.object.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  DraggableChipList,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  draggableListStyle
);
