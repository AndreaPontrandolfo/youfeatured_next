import axios from "axios";
/// Unable to import @types/react-cookie in devDependencies. Here is why: https://stackoverflow.com/questions/50292152/how-to-import-react-cookie-in-typescript
/// Al posto di react-cookie come alternative ci sarebbero: js-cookie, o universal-cookie
// @ts-ignore
import cookie from "react-cookie";
import { Dispatch } from "redux";
// - import { action } from "typesafe-actions";

//// Consider to refactor with arrow functions and async/await syntax.

import {
  AUTH_USER,
  UNAUTH_USER,
  COMMENT_BEING_ADDED,
  COMMENT_WAS_ADDED,
  INCREMENT_LIKES,
  AUTH_ERROR,
  // - RESET_PASSWORD_REQUEST,
  SET_GALLERY_DATA,
  SINGLEIMAGEINFO,
  CHECK_VALID_UPLOAD,
  LOAD_PROFILE_USERNAME,
  FETCH_COMMENT_TOEDIT,
  CHANGE_TAB_KEY,
  CHANGE_SECTION_TAB_KEY
  /* FETCH_TOTAL_COMMENTS */
} from "./types";

/// Redux primer: type is the name of the action. All the other attributes are payloads, informations that get carried out to the store.

export function addStar({
  // @ts-ignore
  user_id,
  // @ts-ignore
  image_id
}) {
  return function(dispatch: Dispatch) {
    axios
      .post(`/api/gallery/view/:imageid/star`, {
        user_id,
        image_id
      })
      .then(response => {
        console.log(response.data);
        dispatch({ type: INCREMENT_LIKES });
      })
      .catch(err => console.log(`Errore cercando di inserire un like: ${err}`));
  };
}

export function currentTabKey({
  // @ts-ignore
  tabsKey
}) {
  return function(dispatch: Dispatch) {
    dispatch({ type: CHANGE_TAB_KEY, payload: tabsKey });
  };
}

export function setSectionTab(sectionTabKey: string) {
  return function(dispatch: Dispatch) {
    dispatch({ type: CHANGE_SECTION_TAB_KEY, payload: sectionTabKey });
  };
}

export function checkForMaxUploads({
  // @ts-ignore
  user_id
}) {
  return function(dispatch: Dispatch) {
    axios
      .post(`/api/upload/image/validupload`, {
        user_id
      })
      .then(response => {
        dispatch({ type: CHECK_VALID_UPLOAD, payload: response.data });
      })
      .catch(err =>
        console.log(`Error trying to validate the upload attempt: ${err}`)
      );
  };
}

export function fetchUsername({
  // @ts-ignore
  uid
}) {
  return function(dispatch: Dispatch) {
    axios
      .post(`/api/profile`, {
        uid
      })
      .then(response => {
        dispatch({ type: LOAD_PROFILE_USERNAME, payload: response.data });
      })
      .catch(err => console.log(`Error trying to fetch the username: ${err}`));
  };
}

export function submitComment({
  // @ts-ignore
  comment_text,
  // @ts-ignore
  author,
  // @ts-ignore
  image_id,
  // @ts-ignore
  replyKey
}) {
  return function(dispatch: Dispatch) {
    axios
      .post(`/api/gallery/view/:imageid/comment/${author}`, {
        comment_text,
        author,
        image_id,
        replyKey
      })
      .then(() => {
        dispatch({ type: COMMENT_BEING_ADDED, commentAddingPayload: true });
      })
      .catch(err => console.log(`Errore sulla comment box: ${err}`));
  };
}

export function commentWasAdded() {
  return function(dispatch: Dispatch) {
    dispatch({ type: COMMENT_WAS_ADDED, commentAddingPayload: false });
  };
}

export function fetchCommentToEdit({
  // @ts-ignore
  editCommentId
}) {
  return function(dispatch: Dispatch) {
    dispatch({ type: FETCH_COMMENT_TOEDIT, payload: editCommentId });
  };
}

export function editCommentById({
  // @ts-ignore
  comment_text_edited,
  // @ts-ignore
  comment_id
}) {
  return function(dispatch: Dispatch) {
    axios
      .put(`/api/gallery/view/:imageid/comment/${comment_id}`, {
        comment_text_edited,
        comment_id
      })
      .then(() => {
        dispatch({ type: COMMENT_BEING_ADDED, commentAddingPayload: true });
      })
      .catch(err =>
        console.log(`Error trying fetch the comment to edit: ${err}`)
      );
  };
}

/* export function signInAction({ email, password }, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}/signin`, { email, password });

      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', res.data.token);
      history.push('/secret');
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
} */

// @ts-ignore
export function loginUser({ email, password }) {
  return function(dispatch: Dispatch) {
    axios
      .post(`/api/signin`, { email, password })
      .then(response => {
        cookie.save("token", response.data.token, { path: "/" });
        dispatch({ type: AUTH_USER });
        /// Potrebbe essere rimpiazzato con "history.push('/gallery')"
        window.location.href = "/gallery";
        // - history.push('/gallery')
        // - this.props.history.push('/gallery')
      })
      .catch(() => {
        dispatch({
          type: AUTH_ERROR,
          payload: "Some credentials invalid. Please try again."
        });
      });
  };
}

/// We are using axios to send a POST request to our API, with the request body being the form inputs (in object form). We save the JWT response we get from our API in a cookie in the event that we have a successful request and reach our .then(). We also dispatch an action with the type AUTH_USER, which will tell our reducer to update our state, saying the user is now authenticated. Then we redirect the user to the gallery.
// @ts-ignore
export function registerUser({ username, email, password }) {
  return function(dispatch: Dispatch) {
    axios
      .post(`/api/signup`, { username, email, password })
      .then(response => {
        console.log(response);
        if (response.data.token) {
          cookie.save("token", response.data.token, { path: "/" });
          dispatch({ type: AUTH_USER });
          /// Potrebbe essere rimpiazzato con "history.push('/gallery')" o "this.props.history.push('/gallery')" oppure tentare con "<Redirect to="/" push />" oppure wrappare l'export con withRouter.
          window.location.href = "/gallery";
        } else {
          dispatch({ type: AUTH_ERROR, payload: response.data.error });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function logoutUser(error: any) {
  return function(dispatch: Dispatch) {
    dispatch({ type: UNAUTH_USER, payload: error || "" });
    cookie.remove("token", { path: "/" });
  };
}

/// Our protectedTest() action creator is sending a GET request to our API's /protected endpoint, which requires a valid JWT to be sent in the authorization header in order to send back a response. Note how we send the authorization header with this request. Additionally, the response is being dispatched in the payload. Keep in mind, our protected route is sending a JSON response. The key we set it up to send was content. You will be able to access your API responses in other requests in the same way (response.data.yourKeyName).
/* export function protectedTest() {  
  return function(dispatch) {
    axios.get(`/protected`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
} */

/* export function fetchLadder() {
  return function(dispatch: Dispatch) {
    return axios
      .get(`/api/ladder`)
      .then(({ data }) => {
        dispatch(setLadderData(data));
      })
      .catch(err => console.log(`Errore sulla ladder ${err}`));
    // - .catch(response => dispatch(errorHandler(response.data.error)));
  };
}

function setLadderData(data: object) {
  console.log("TCL: setLadderData -> data", data);
  return {
    type: SET_LADDER_DATA,
    payload: data
  };
} */

export function fetchGallery() {
  return function(dispatch: Dispatch) {
    return axios
      .get(`/api/gallery`)
      .then(({ data }) => {
        dispatch(setGalleryData(data));
      })
      .catch(err => console.log(`Errore fetchando gli artworks... ${err}`));
  };
}

function setGalleryData(data: any) {
  const ladder = data.total_images;
  const ladderData = ladder.map((element: any, i: number) => {
    const { width, height, src, id, ...rest } = element;
    return {
      ...rest,
      key: i + 1
    };
  });

  return {
    type: SET_GALLERY_DATA,
    total_images_payload: data.total_images,
    total_comments_payload: data.total_comments_result,
    ladder_payload: ladderData
  };
}

/* export const submitImage = () => async (dispatch: Dispatch) => {
  const res = await axios.post("/api/upload");

  this.props.history.push("/upload");
  dispatch({ type: FETCH_USER, payload: res.data });
}; */

/* // @ts-ignore
export function fetchSingleImageInfo({ imageid }) {
  return function(dispatch: Dispatch) {
    axios
      .post(`/api/gallery/view`, { imageid })
      .then(response => {
        dispatch({ 
          type: SINGLEIMAGEINFO,
          payload: response
         });
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}
 */

export function fetchSingleImageInfo(imageid: number) {
  return function(dispatch: Dispatch) {
    return axios
      .post(`/api/gallery/view/${imageid}`, { imageid })
      .then(({ data }) => {
        const imageInfo = data.imageSingle;
        const imageCommentList = data.imageComments;
        const imageCommentList_base = imageCommentList.filter(
          (i: any) => i.user_reply === null
        );
        const imageCommentList_replies = imageCommentList
          .filter((i: any) => typeof i.user_reply === "number")
          .reverse();

        dispatch(
          setSingleImageInfo(
            imageInfo,
            imageCommentList,
            imageCommentList_base,
            imageCommentList_replies
          )
        );
      })
      .catch(err => console.log(`Errore sull' immagine ${err}`));
  };
}

function setSingleImageInfo(
  imageData: object,
  imageCommentList: object,
  imageCommentList_base: object[],
  imageCommentList_replies: object[]
) {
  return {
    imageData,
    imageCommentList,
    imageCommentList_base,
    imageCommentList_replies,
    type: SINGLEIMAGEINFO
  };
}

/* export function fetchTotalCommentsPerImage() {
  return function(dispatch: Dispatch) {
    axios
      .get(`/api/gallery`)
      .then(response => {
        console.log(response.data);
        dispatch({ type: FETCH_TOTAL_COMMENTS });
      })
      .catch(err =>
        console.log(`Error trying to fetch the total of the comments: ${err}`)
      );
  };
}

export function fetchTotalCommentsPerImage(categoryAction: string) {
  return function(dispatch: Dispatch) {
    return axios
      .get(`/api/gallery/totalcomments`)
      .then(({ data }) => {
        dispatch(setTotalCommentsPerImage(data, categoryAction));
      })
      .catch(err => console.log(`Errore sulla gallery ${err}`));
  };
}

function setTotalCommentsPerImage(data: object, categoryAction: string) {
  console.log("TCL: setGalleryData -> data", data);
  return {
    type: SET_GALLERY_DATA,
    dataPayload: data,
    categoryPayload: categoryAction
  };
} */
