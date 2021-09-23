import React, { Component } from "react";
import { connect } from "react-redux";
import Media from "react-media";
import {
  Row,
  Col,
  Form,
  Icon,
  Divider,
  Button,
  message,
  Input,
  BackTop
} from "antd";

import {
  fetchSingleImageInfo,
  submitComment,
  fetchUsername,
  fetchCommentToEdit,
  editCommentById,
  commentWasAdded
} from "../../actions/actionCreators";
import CardListItem from "./CardListItem";
import EditCommentModalForm from "./EditCommentModalForm";

const FormItem = Form.Item;
const { TextArea } = Input;
const ButtonGroup = Button.Group;

class Single extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisibility: false,
      showResults: false,
      showReplyForm: false,
      replyKey: null,
      readMoreSwitch: {
        identifier: 0,
        blackListedKeys: []
      }
    };
  }

  componentDidMount() {
    /// Bug: the user doesn't land at the top of the page, but at the middle. Could be caused by the
    /// window.scrollTo(0, 0); fixes it.
    window.scrollTo(0, 0);
    const { imageid } = this.props.match.params;
    this.props.fetchSingleImageInfo(imageid);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.commentBeingAdded !== this.props.commentBeingAdded) {
      const { imageid } = this.props.match.params;
      this.props.fetchSingleImageInfo(imageid);
      this.props.commentWasAdded();
    }
  }

  showHideToggle = () => {
    if (this.props.auth.authenticated) {
      this.setState({ showReplyForm: false });
      this.setState({ replyKey: null });
      this.setState(prevState => ({ showResults: !prevState.showResults }));
      this.props.form.resetFields();
    } else {
      message.error("You need to be logged in to write a comment.");
    }
  };

  showHideToggleReply = key => {
    if (this.props.auth.authenticated) {
      this.setState({ showResults: false });
      this.setState({ replyKey: key });
      this.setState(prevState => ({ showReplyForm: !prevState.showReplyForm }));
      this.props.form.resetFields();
    } else {
      message.error("You need to be logged in to reply to a comment.");
    }
  };

  readMore = key => {
    this.setState(prevState => ({
      readMoreSwitch: {
        identifier: key,
        blackListedKeys: prevState.readMoreSwitch.blackListedKeys.concat(key)
      }
    }));
  };

  editComment = editCommentId => {
    this.props.fetchCommentToEdit({ editCommentId });
    this.setState({
      modalVisibility: true
    });
  };

  editModalOk = e => {
    e.preventDefault();
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        const image_id = this.props.match.params.imageid;
        const comment_id = this.props.imageFullInfo.textToEditId;
        const fullFormProps = {
          ...values,
          comment_id
        };
        this.props.editCommentById(fullFormProps);
        message.success("Comment edited!");
        this.setState({
          modalVisibility: false
        });
        this.props.form.resetFields();
      }
    });
  };

  editModalCancel = () => {
    this.setState({
      modalVisibility: false
    });
    this.props.form.resetFields();
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleCommentFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const image_id = this.props.match.params.imageid;
        const { uid } = this.props.auth;
        const fullFormProps = {
          ...values,
          author: uid,
          image_id,
          replyKey: this.state.replyKey
        };
        this.props.auth.currentUser_username === ""
          ? this.props.fetchUsername({ uid })
          : null;
        this.props.submitComment(fullFormProps);
        message.success("Comment added!");
        this.props.form.resetFields();
        this.setState({
          showResults: false,
          showReplyForm: false,
          replyKey: null
        });
        // - this.setState(prev => ({ showResults: !prev.showResults }));
      }
    });
  };

  render() {
    const {
      title,
      category,
      src,
      username,
      height,
      width
    } = this.props.imageFullInfo.singleImage;

    const { pristine, submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { authenticated, currentUser_username, uid } = this.props.auth;
    const { commentList_base, commentList_replies } = this.props.imageFullInfo;
    const { modalVisibility } = this.state;

    const selectedImage = (
      <picture>
        <img
          src={src}
          alt={title}
          height={height}
          width={width}
          className="images_single"
        />
      </picture>
    );

    const CommentForm = (
      <Form
        onSubmit={this.handleCommentFormSubmit}
        hideRequiredMark
        style={{ color: "#fff", paddingTop: "1em" }}
      >
        <FormItem label={<span style={{ color: "#fff" }}>Comment</span>}>
          {getFieldDecorator("comment_text", {
            rules: [
              {
                whitespace: true,
                message: "The comment box is empty."
              },
              {
                max: 3000,
                message: "Max number of characters reached for this comment."
              }
            ]
          })(<TextArea placeholder="Write a comment" rows={20} />)}
        </FormItem>
        <ButtonGroup className="singleImage-component_comment_submit">
          <Button
            type="primary"
            disabled={pristine || submitting}
            htmlType="submit"
          >
            OK
          </Button>
          {this.state.showResults ? (
            <Button onClick={this.showHideToggle} className="cancelButton">
              Cancel
            </Button>
          ) : (
            <Button onClick={this.showHideToggleReply} className="cancelButton">
              Cancel
            </Button>
          )}
        </ButtonGroup>
      </Form>
    );

    const cuttedMessageContent = 400;

    const slicedCommentStart = currentComment => {
      return currentComment.slice(0, cuttedMessageContent);
    };

    const slicedCommentEnd = currentComment => {
      return currentComment.slice(cuttedMessageContent);
    };

    /// In CommentListItem we are binding the onClick event directly in the render methods which will cause unnecessary extra renders and thus worse performance. Workarounds exist but are complicated.
    const CommentListItem_base = commentList_base.map(element => (
      <li key={element.id} style={{ marginBottom: "1em" }}>
        {element.comment_text.length > cuttedMessageContent + 100 &&
        this.state.readMoreSwitch.blackListedKeys.includes(element.id) ===
          false ? (
          <CardListItem
            username={element.username}
            commenter_id={element.commenter_id}
            current_userId={uid}
            timestamp={element.comment_timestamp}
            replyEvent={() => this.showHideToggleReply(element.id)}
            editEvent={() => this.editComment(element.id)}
            comment_text={
              <React.Fragment>
                {slicedCommentStart(element.comment_text)}
                {this.state.readMoreSwitch.identifier === element.id ? (
                  slicedCommentEnd(element.comment_text)
                ) : (
                  <span
                    className="quaternary_typography_theme cursor_pointer"
                    onClick={() => this.readMore(element.id)}
                  >
                    {" "}
                    Read more...
                  </span>
                )}
              </React.Fragment>
            }
          />
        ) : (
          <CardListItem
            username={element.username}
            commenter_id={element.commenter_id}
            current_userId={uid}
            timestamp={element.comment_timestamp}
            replyEvent={() => this.showHideToggleReply(element.id)}
            editEvent={() => this.editComment(element.id)}
            comment_text={element.comment_text}
          />
        )}
        {
          <ul className="commentList_replies">
            {commentList_replies.map(elementReplies => (
              <li key={elementReplies.id} style={{ marginTop: "1em" }}>
                {elementReplies.user_reply === element.id ? (
                  elementReplies.comment_text.length >
                    cuttedMessageContent + 100 &&
                  this.state.readMoreSwitch.blackListedKeys.includes(
                    elementReplies.id
                  ) === false ? (
                    <CardListItem
                      username={elementReplies.username}
                      timestamp={elementReplies.comment_timestamp}
                      commenter_id={elementReplies.commenter_id}
                      current_userId={uid}
                      replyEvent={() => this.showHideToggleReply(element.id)}
                      editEvent={() => this.editComment(elementReplies.id)}
                      comment_text={
                        <React.Fragment>
                          {slicedCommentStart(elementReplies.comment_text)}
                          {this.state.readMoreSwitch.identifier ===
                          elementReplies.id ? (
                            slicedCommentEnd(elementReplies.comment_text)
                          ) : (
                            <span
                              className="quaternary_typography_theme cursor_pointer"
                              onClick={() => this.readMore(elementReplies.id)}
                            >
                              {" "}
                              Read more...
                            </span>
                          )}
                        </React.Fragment>
                      }
                    />
                  ) : (
                    <CardListItem
                      username={elementReplies.username}
                      timestamp={elementReplies.comment_timestamp}
                      commenter_id={elementReplies.commenter_id}
                      current_userId={uid}
                      replyEvent={() => this.showHideToggleReply(element.id)}
                      editEvent={() => this.editComment(elementReplies.id)}
                      comment_text={elementReplies.comment_text}
                    />
                  )
                ) : null}
                {this.state.showReplyForm &&
                elementReplies.id === this.state.replyKey
                  ? CommentForm
                  : null}
              </li>
            ))}
          </ul>
        }
        {this.state.showReplyForm && element.id === this.state.replyKey
          ? CommentForm
          : null}
      </li>
    ));

    const commentSection = (
      <React.Fragment>
        <Divider>
          <Icon
            type="message"
            theme="outlined"
            className="singleImage-component_icons"
          />
          <span className="secondary_typography_theme">COMMENTS</span>
        </Divider>
        <div>
          {!authenticated ? (
            <p>You must be logged in to write comments</p>
          ) : null}
          {authenticated ? (
            <Button
              type="primary"
              onClick={this.showHideToggle}
              className="singleImage-component_comment_submit"
            >
              +&emsp;Add a comment
            </Button>
          ) : null}
          {/* /// Show/hide toggle logic for the CommentForm */}
          {this.state.showResults ? CommentForm : null}
          <ul className="commentList">{CommentListItem_base}</ul>
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <BackTop />
        <EditCommentModalForm
          {...this.props}
          wrappedComponentRef={this.saveFormRef}
          visible={modalVisibility}
          onCreate={this.editModalOk}
          onCancel={this.editModalCancel}
        />
        <Row type="flex" justify="space-around">
          <Col>
            <span className="main_typography_theme underline margin_right">
              TITLE
            </span>
            <span className="secondary_typography_theme">{title}</span>
          </Col>
          <Col>
            <span className="main_typography_theme underline margin_right">
              AUTHOR
            </span>
            <span className="secondary_typography_theme">{username}</span>
          </Col>
          <Col>
            <span className="main_typography_theme underline margin_right">
              CATEGORY
            </span>
            <span className="secondary_typography_theme">{category}</span>
          </Col>
        </Row>
        {height > width ? (
          <Media query="(max-width: 2384px)">
            {matches =>
              matches ? (
                <React.Fragment>
                  <div className="content_center_image">{selectedImage}</div>
                  <div className="content_center">
                    <section className="singleImage-component_comment">
                      {commentSection}
                    </section>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="float_left">{selectedImage}</div>
                  <section className="singleImage-component_comment float_right">
                    {commentSection}
                  </section>
                </React.Fragment>
              )
            }
          </Media>
        ) : (
          <React.Fragment>
            <div className="content_center_image">{selectedImage}</div>
            <div className="content_center">
              <section className="singleImage-component_comment">
                {commentSection}
              </section>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    imageFullInfo: state.singleImageReducer,
    auth: state.auth,
    commentBeingAdded: state.comments.commentAdding
  };
}

const WrappedSingle = Form.create()(Single);

export default connect(
  mapStateToProps,
  {
    fetchSingleImageInfo,
    submitComment,
    fetchUsername,
    fetchCommentToEdit,
    editCommentById,
    commentWasAdded
  }
)(WrappedSingle);
