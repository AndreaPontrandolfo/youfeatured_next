import { CHANGE_SECTION_TAB_KEY } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case CHANGE_SECTION_TAB_KEY:
      return { ...state, sectionTabKeyChanged: action.payload };
    default:
      return state;
  }
}
