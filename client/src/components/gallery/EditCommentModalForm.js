import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Modal } from "antd";

const FormItem = Form.Item;
const { TextArea } = Input;

/// Bug: il this.props.form al momento raccoglie i dati sia dei commenti normali, sia delle modali.

class EditCommentModalForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { commentList, textToEditId } = this.props.imageFullInfo;
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;

    const textToEdit = commentList.find(comment => comment.id === textToEditId);

    let textToEditValue = "";
    if (textToEdit !== undefined) {
      textToEditValue = textToEdit.comment_text;
    }

    return (
      <Modal
        centered
        visible={visible}
        title={
          <span className="quaternary_typography_theme">Edit Comment</span>
        }
        okText="Ok"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical" hideRequiredMark>
          <FormItem label="Comment">
            {getFieldDecorator("comment_text_edited", {
              rules: [
                {
                  whitespace: true,
                  message: "The comment box is empty."
                },
                {
                  max: 3000,
                  message: "Max number of characters reached for this comment."
                }
              ],
              initialValue: textToEditValue
            })(<TextArea rows={18} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    imageFullInfo: state.singleImageReducer
  };
}

const WrappedEditCommentModalForm = Form.create()(EditCommentModalForm);

export default connect(
  mapStateToProps,
  null
)(WrappedEditCommentModalForm);
