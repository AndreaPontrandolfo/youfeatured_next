/* tslint:disable */
import { COMMENT_BEING_ADDED, COMMENT_WAS_ADDED } from "../actions/types";

const INITIAL_STATE = {
  commentAdding: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case COMMENT_BEING_ADDED:
      return { ...state, commentAdding: action.commentAddingPayload };
    case COMMENT_WAS_ADDED:
      return { ...state, commentAdding: action.commentAddingPayload };
    default:
      return state;
  }
}

/* const comments = (state = {}, action) => {
  if (typeof action.postId !== 'undefined') {
    return {
      ...state,
      [action.postId]: postComments(state[action.postId], action)
    }
  }
  return state
}

const postComments = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [
        ...state,
        {
          text: action.comment,
          user: action.author
        }
      ]
    case 'REMOVE_COMMENT':
      return [
        ...state.slice(0, action.commentId),
        ...state.slice(action.commentId + 1)
      ]
    default:
      return state
  }
}
export default comments */
