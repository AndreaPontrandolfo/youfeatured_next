import React from "react";
import { Card, Icon, Avatar } from "antd";

const { Meta } = Card;

const CardListItem = ({
  username,
  timestamp,
  comment_text,
  replyEvent,
  editEvent,
  commenter_id,
  current_userId
}) => {
  return (
    <Card
      actions={
        commenter_id === current_userId
          ? [
              <p onClick={replyEvent} className="click_text">
                Reply <Icon type="message" theme="outlined" />
              </p>,
              <p onClick={editEvent} className="click_text">
                Edit <Icon type="edit" theme="outlined" />
              </p>
            ]
          : [
              <p onClick={replyEvent} className="click_text">
                Reply <Icon type="message" theme="outlined" />
              </p>
            ]
      }
      className="singleImage-component_comment_submit"
    >
      <Meta
        avatar={<Avatar size="large" icon="user" />}
        title={
          <React.Fragment>
            <span className="tertiary_typography_theme float_left">
              {username}
            </span>
            <span className="light_text float_right">{timestamp}</span>
          </React.Fragment>
        }
        description={<article className="comments-content">{comment_text}</article>}
      />
    </Card>
  );
};

export default CardListItem;
