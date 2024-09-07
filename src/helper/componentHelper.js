// MARK: library imports
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// MARK: ui imports
import withStyles from "@material-ui/core/styles/withStyles";

// MARK: connect functions

export function connectComponent(component, actionCreators, mapStateToProps) {
  function mapDispachToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
  }
  return connect(
    mapStateToProps,
    mapDispachToProps
  )(component);
}

export function connectComponentWithStyle(
  component,
  actionCreators,
  mapStateToProps,
  styles
) {
  return withStyles(styles)(
    connectComponent(component, actionCreators, mapStateToProps)
  );
}
