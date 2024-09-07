// MARK: functions

function app(state = [], action) {
  switch (action.type) {
    case "ADD_LOADING":
      return Object.assign({}, state, {
        loading: state.loading + 1
      });
    case "REMOVE_LOADING":
      return Object.assign({}, state, {
        loading: Math.max(state.loading - 1, 0)
      });
    default:
      return state;
  }
}

export default app;
