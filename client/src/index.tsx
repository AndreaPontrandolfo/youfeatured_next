import React from "react";
import { render } from "react-dom";
/// Redux primer: the Provider is a component that makes the store accessible to every component in the app. It knows how to detect and read changes of the state in the store. Everytime this happens the provider  will update all of it's children components with changes that reflects the new state.
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router-dom";
import { Layout, Divider } from "antd";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

import store, { history } from "./store";
import {
  LoadableSkeleton,
  LoadingCircle
} from "./components/LoadableComponent";
/// stiling
import "./styles/style.scss";

/// Components
//#region

/// The Home as to get always rendered, so no React Loadable.
import Home from "./components/Home";
/// The Logout never gets rendered anyway, so no React Loadable.
import Logout from "./components/auth/Logout";

// - import Terms from "./components/Terms/Terms";
// - import Privacy from "./components/Privacy/Privacy";
// - import NotFound from "./components/Error/NotFound";

/// Componenti di global layout
import HeaderComponent from "./components/menu/Header";
import FooterComponent from "./components/Footer";

// - const About = LoadableSkeleton(() => import("./components/About"));
const Upload = LoadableSkeleton(() => import("./components/UploadPage"));
const ForgotPassword = LoadableSkeleton(() =>
  import("./components/auth/ForgotPassword")
);
const Profile = LoadableSkeleton(() => import("./components/auth/Profile"));
const Signin = LoadableSkeleton(() => import("./components/auth/Signin"));
const Register = LoadableSkeleton(() => import("./components/auth/Register"));
const Single = LoadingCircle(() => import("./components/gallery/Single"));
const ArtworksSuperWrapper = LoadingCircle(() =>
  import("./components/gallery/ArtworksSuperWrapper")
);
const HallOfFame = LoadingCircle(() => import("./components/HallOfFame"));

import About from "./components/About";
/* import Upload from "./components/UploadPage";
import Profile from "./components/auth/Profile";
import Signin from "./components/auth/Signin";
import Register from "./components/auth/Register";
import Single from "./components/gallery/Single";
import ArtworksSuperWrapper from "./components/gallery/ArtworksSuperWrapper";
import HallOfFame from "./components/HallOfFame"; */

//#endregion

const { Content, Footer } = Layout;

const userIsAuthenticated = connectedRouterRedirect({
  /// The url to redirect user to if they fail
  redirectPath: "/signin",
  /// If selector is true (state contains user data), wrapper will not redirect
  // @ts-ignore
  authenticatedSelector: state => state.auth.authenticated !== false,
  wrapperDisplayName: "UserIsAuthenticated"
});

const userIsNotAuthenticated = connectedRouterRedirect({
  /// The url to redirect user to if they fail
  redirectPath: "/gallery",
  /// If selector is true (state contains user data), wrapper will not redirect
  // @ts-ignore
  authenticatedSelector: state => state.auth.authenticated === false,
  wrapperDisplayName: "UserIsNotAuthenticated"
});

const userIsAuthenticatedAndValidUploads = connectedRouterRedirect({
  /// The url to redirect user to if they fail
  redirectPath: "/gallery",
  /// If selector is true (state contains user data), wrapper will not redirect

  authenticatedSelector: state =>
    // @ts-ignore
    state.auth.authenticated && state.uploadValidityCheck.valid,
  wrapperDisplayName: "UserIsAuthenticated"
});

render(
  /// Provider requires passing store to be able to use connect() calls.
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout style={{ backgroundColor: "#232524" }}>
        <div
          className="fullnavbar"
          style={{ backgroundColor: "rgba(34, 34, 34, 0.753)" }}
        >
          <HeaderComponent />
          <Divider className="menu_custom_divider" />
        </div>
        <Content
          style={{
            minHeight: "95vh",
            margin: "1em 2em 0 2em",
            paddingTop: "6em"
          }}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/ladder" component={ArtworksSuperWrapper} />
            <Route path="/gallery" component={ArtworksSuperWrapper} />
            <Route exact path="/view/:imageid" component={Single} />
            <Route exact path="/hallOfFame" component={HallOfFame} />
            <Route exact path="/about" component={About} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route
              exact
              path="/profile"
              // @ts-ignore
              component={userIsAuthenticated(Profile)}
            />
            <Route
              exact
              path="/upload"
              // @ts-ignore
              component={userIsAuthenticatedAndValidUploads(Upload)}
            />
            <Route
              exact
              path="/logout"
              // @ts-ignore
              component={userIsAuthenticated(Logout)}
            />
            <Route
              exact
              path="/signin"
              // @ts-ignore
              component={userIsNotAuthenticated(Signin)}
            />
            <Route
              exact
              path="/signup"
              // @ts-ignore
              component={userIsNotAuthenticated(Register)}
            />
          </Switch>
        </Content>
        <Footer style={{ backgroundColor: "#353535" }}>
          <FooterComponent />
        </Footer>
      </Layout>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
