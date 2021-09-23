/* tslint:disable */
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import gallery from "./galleryReducer";
import comments from "./commentsReducer";
import authReducer from "./authReducer";
import singleImageReducer from "./singleImage";
import uploadValidityCheck from "./uploadValidityCheck";
import tabKeyChange from "./tabKeyChange";
import sectionTabKeyChange from "./sectionTabKeyChange";

const rootReducer = combineReducers({
  router: routerReducer,
  /// The authReducer records wheter or not the user is logged in .
  auth: authReducer,
  /// The store should know how to handle actions coming from the form components. To enable this, we need to pass the formReducer to your store. It serves for all of your form components, so you only have to pass it once.
  form: formReducer,
  gallery,
  singleImageReducer,
  uploadValidityCheck,
  tabKeyChange,
  sectionTabKeyChange,
  comments
});

export default rootReducer;
