/* tslint:disable */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { logoutUser } from "../../actions/actionCreators";

//// Logout feature could be entirely remade with this method: https://github.com/Remchi/reddice/blob/master/client/components/NavigationBar.js

class Logout extends PureComponent {
  componentWillMount() {
    // @ts-ignore
    this.props.logoutUser();
  }

  render() {
    return (
      <React.Fragment>
        <Redirect to="/signin" push />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { logoutUser }
)(Logout);
