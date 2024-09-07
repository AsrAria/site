// MARK: functions

function user(state = [], action) {
  switch (action.type) {
    case "SET_EMAIL":
      return Object.assign({}, state, { email: action.payload });
    case "SET_PROFILE":
      return Object.assign({}, state, { profile: action.payload });
    case "SET_ACCESS_TOKEN":
      return Object.assign({}, state, { accessToken: action.payload });
    case "SET_ACTIVATE_TTL":
      return Object.assign({}, state, { activateTTL: action.payload });
    default:
      return state;
  }
}

export default user;
