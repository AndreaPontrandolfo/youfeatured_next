import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Popover, Rate, Popconfirm, Form, Button, message, Icon } from "antd";

import star from "./star.png";
import { addStar } from "../../actions/actionCreators";

//// Disabilitare il cursor pointer nel css se questo prende effetto sulla stella
const imgWithClick = { cursor: "pointer" };

class Photo extends Component {
  constructor(props) {
    super(props);
  }

  handleStarSubmit = e => {
    e.preventDefault();
    if (this.props.auth.authenticated) {
      this.props.form.validateFields(err => {
        if (!err) {
          const { photo } = this.props;
          const { uid } = this.props.auth;
          this.props.addStar({ user_id: uid, image_id: photo.id });
        }
      });
    } else {
      message.error("You need to be logged in to rank this image!");
    }
  };

  render() {
    const {
      index,
      onClick,
      photo,
      margin,
      direction,
      top,
      left,
      gallery_total_comments
    } = this.props;

    const { title, category, username, likes_total } = photo;

    const imgStyle = { margin: margin };

    if (direction === "column") {
      imgStyle.position = "absolute";
      imgStyle.left = left;
      imgStyle.top = top;
    }

    const handleClick = event => {
      onClick(event, { photo, index });
    };

    const artworkTitle = `Title: ${title}`;

    const artworkContent = (
      <section>
        <p>Author: {username}</p>
        <p>Category: {category}</p>
        <p>
          Comments: {gallery_total_comments.total_comments}{" "}
          <Icon type="message" theme="outlined" />
        </p>
      </section>
    );

    const popconfirmText = (
      <section>
        <p>Are you sure you want to star this artwork?</p>
        <div>This cannot be undone.</div>
      </section>
    );

    return (
      <div className="item">
        <Link to={`/view/${photo.id}`}>
          <img
            style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
            {...photo}
            onClick={onClick ? handleClick : null}
          />
        </Link>
        <div className="item-overlay top">
          {/*  <Popconfirm
              title={popconfirmText}
              onConfirm={confirm} onCancel={cancel}  okText="Yes"
              cancelText="No"
            > */}
          <Form onSubmit={this.handleStarSubmit}>
            <Form.Item>
              <button type="submit" className="clickableStar">
                <img src={star} height="28em" width="28em" alt="star" />
              </button>
              {/*                 <Button type="primary" htmlType="submit">
                  Submit
                </Button> */}
              {/*                 <button type="submit">
                  <Rate
                    count={1}
                    style={{ fontSize: "2em", position: "absolute" }}
                  />
                </button> */}
            </Form.Item>
          </Form>

          {/* </Popconfirm> */}
          <div className="starInfo-placement">
            {likes_total}{" "}
            <img src={star} height="20em" width="20em" alt="star" />{" "}
          </div>
          <Popover
            content={artworkContent}
            title={
              <span className="secondary_typography_theme">{artworkTitle}</span>
            }
            placement="rightBottom"
            className="popover-text"
          >
            <span className="popover-text">More Details</span>
          </Popover>

          {/*           <Icon
            type="star"
            theme="twoTone"
            twoToneColor="#FFF68F"
            style={{ fontSize: "1.5em" }}
          /> */}
        </div>
      </div>
    );
  }
}

export const photoPropType = PropTypes.shape({
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  srcSet: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sizes: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
});

Photo.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  photo: photoPropType.isRequired,
  margin: PropTypes.number,
  top: props => {
    if (props.direction === "column" && typeof props.top !== "number") {
      return new Error(
        "top is a required number when direction is set to `column`"
      );
    }
  },
  left: props => {
    if (props.direction === "column" && typeof props.left !== "number") {
      return new Error(
        "left is a required number when direction is set to `column`"
      );
    }
  },
  direction: PropTypes.string
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    gallery_total_comments: state.gallery.total_comments
  };
}

const WrappedPhoto = Form.create()(Photo);

export default connect(
  mapStateToProps,
  { addStar }
)(WrappedPhoto);
