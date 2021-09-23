import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  LOAD_PROFILE,
  LOAD_PROFILE_USERNAME
} from "../actions/types";

const INITIAL_STATE = {
  error: "",
  uid: -1,
  authenticated: false,
  currentUser_username: ""
};

// @ts-ignore
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case LOAD_PROFILE:
      return { ...state, uid: action.payload, authenticated: true };
    case LOAD_PROFILE_USERNAME:
      return { ...state, currentUser_username: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case UNAUTH_USER:
      return INITIAL_STATE;
  }

  return state;
}
