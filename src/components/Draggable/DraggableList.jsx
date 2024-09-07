// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// MARK: project imports
import { connectComponent } from "helper/componentHelper.js";

// MARK: component

class DraggableList extends React.Component {
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  handleDrag = result => {
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.props.items,
      result.source.index,
      result.destination.index
    );

    this.props.itemsChangeHandler(items);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.handleDrag}>
        <Droppable droppableId="droppable" direction={this.props.type}>
          {provided => (
            <div
              style={Object.assign(
                {},
                this.props.styles.root !== undefined
                  ? this.props.styles.root
                  : {},
                this.props.type === "horizontal"
                  ? {
                      display: "flex",
                      overflow: "auto",
                      direction: "ltr"
                    }
                  : {}
              )}
              ref={provided.innerRef}
            >
              {this.props.items.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {this.props.getItemComponent(
                        snapshot.isDragging,
                        item,
                        index
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

// MARK: prop type validation

DraggableList.defaultProps = {
  classes: {},
  styles: {},
  items: [],
  type: "vertical",
  getItemComponent: () => {
    return null;
  },
  itemsChangeHandler: () => {}
};

DraggableList.propTypes = {
  classes: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  getItemComponent: PropTypes.func.isRequired,
  itemsChangeHandler: PropTypes.func.isRequired
};

// MARK: export

export default connectComponent(DraggableList, [], function mapStateToProps(
  state
) {
  return {
    app: state.app
  };
});
