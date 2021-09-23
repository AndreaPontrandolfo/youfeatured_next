/* tslint:disable */
import { /* FETCH_TOTAL_COMMENTS, */ FETCH_COMMENT_TOEDIT } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    /* case FETCH_TOTAL_COMMENTS:
      return { ...state, singleImage: action.imageData, commentList_base: action.imageCommentList_base, commentList_replies: action.imageCommentList_replies }; */
    case FETCH_COMMENT_TOEDIT:
      return { ...state, commentToEdit: action.payload };
    default:
      return state;
  }
}