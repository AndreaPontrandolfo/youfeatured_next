import { CHANGE_TAB_KEY } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case CHANGE_TAB_KEY:
      return { ...state, tabKeyChanged: action.payload };
    default:
      return state;
  }
}
