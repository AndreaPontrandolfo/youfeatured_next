import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Alert, Button } from "antd";

import { fetchUsername } from "../../actions/actionCreators";
import CardBase from "../CardBase";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  /// React primer: The componentDidMount() hook runs after the component output has been rendered to the DOM.
  componentDidMount() {
    const { uid } = this.props.auth;
    this.props.auth.currentUser_username === ""
      ? this.props.fetchUsername({ uid })
      : null;
  }

  render() {
    const { currentUser_username } = this.props.auth;

    return (
      <CardBase cardtitle="Your account details">
        <p>Your username is: {currentUser_username}</p>
        <p>Status:</p>
        <p>Currently uploadded images:</p>
        <Alert
          message="Warning: Danger Zone. Click the button below if you are sure you want to delete your account forever."
          description="This action cannot be undone. Please be sure."
          type="warning"
          showIcon
        />
        <Button type="danger">Delete Account</Button>
      </CardBase>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  { fetchUsername }
)(Profile);
