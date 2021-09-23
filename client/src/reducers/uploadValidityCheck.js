/* tslint:disable */
import { CHECK_VALID_UPLOAD } from '../actions/types';

const initialState = {
  valid: true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECK_VALID_UPLOAD:
      return { ...state, valid: action.payload };
    default:
      return state;
  }
}