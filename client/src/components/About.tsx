import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Divider } from "antd";

import { categories } from "../helpers/categories";

/// Necessary coaleshe algorithm.
const categoriesList = categories.map(
  (category, i) =>
    !(i === categories.length - 1) ? (
      <span key={category}>{category}, </span>
    ) : (
      <span key={category}>{category}</span>
    )
);

class About extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    // @ts-ignore
    const { authenticated } = this.props.auth;
    return (
      <React.Fragment>
        <h3>
          About
          <Divider type="vertical" />
          <a href="#">Rules</a>
          <Divider type="vertical" />
          <a href="#">Contacts</a>
          <Divider type="vertical" />
          <a href="#">Support</a>
          <Divider type="vertical" />
          <a href="#">Feedback</a>
        </h3>
        <section>
          <Divider orientation="left">
            <h2 className="secondary_typography_theme custom_h2">Infos</h2>
          </Divider>

          <p className="about-content">
            Hello, and welcome to YouFeatured.com! Here is the place where
            artists from all over the world challenge themselves in a
            competitive battle. Our goal is to give our users the opportunity to
            express their creativity at it's fullest. Do you feel brave enough
            to face this challenge yourself? If that's so, don't wait any
            longer!
            <Link to="/signup"> Register</Link>,<Link to="/signin"> login</Link>{" "}
            and{" "}
            {authenticated ? (
              <Link to="/upload"> upload</Link>
            ) : (
              <Link to="/signin"> upload</Link>
            )}
            your art now!
          </p>
          <p className="about-content">
            Also don't forget to read the rules.
            {/* <Link to="/rules"> read the rules</Link>. */}
          </p>
          <Divider orientation="right">
            <h2 className="secondary_typography_theme custom_h2">Rules</h2>
          </Divider>
          <div className="about-content">
            <p>YouFeatured.com is hosting monthly competitions.</p>
            <p>
              In order to win you must bring your best images. If you want to
              upload or upvote images it's mandatory that you create an account
              and login. Every user can upload only up to 3 images per month and
              can upvote any image at any time. In order to upload the second
              and third image you must upvote at least 1 image of another user.
            </p>
            <p>
              You must choose a category for every image at the time of the
              upload. The categories are: {categoriesList}.
            </p>
            <p>
              All the images will be displayed in the gallery sorted by upvotes.
              If you are brave enough to win the competition, your winning image
              will get displayed in the landing page the next month and will
              also gain a spot in the Hall of Fame section. Forever. At the end
              of every month every non-winning image will get deleted from our
              systems.
            </p>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  null
)(About);

/*         <Divider orientation="left">
          <h2 className="secondary_typography_theme custom_h2">Contacts</h2>
        </Divider>
        <p className="about-content">Contaaaaaaaaaaaaaacts!!</p>
        <Divider orientation="right">
          <h2 className="secondary_typography_theme custom_h2">Support</h2>
        </Divider>
        <p className="about-content">suppoooooort!!</p>
        <Divider orientation="left">
          <h2 className="secondary_typography_theme custom_h2">Feedback</h2>
        </Divider>
        <p className="about-content">
          Feedback If you think this is useful, we'd love to hear from you.
          Please reach out to @YouFeatured.com with any questions or concerns.
        </p> */
