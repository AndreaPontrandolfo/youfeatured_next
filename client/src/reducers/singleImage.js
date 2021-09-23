/* tslint:disable */
import { SINGLEIMAGEINFO, FETCH_COMMENT_TOEDIT } from "../actions/types";

const initialState = {
  singleImage: {},
  commentList: [],
  commentList_base: [],
  commentList_replies: [],
  textToEditId: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SINGLEIMAGEINFO:
      return {
        ...state,
        commentList: action.imageCommentList,
        singleImage: action.imageData,
        commentList_base: action.imageCommentList_base,
        commentList_replies: action.imageCommentList_replies
      };
    case FETCH_COMMENT_TOEDIT:
      return { ...state, textToEditId: action.payload };
    default:
      return state;
  }
}
