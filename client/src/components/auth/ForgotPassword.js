import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Alert, Input, message } from "antd";

import CardBase from "../CardBase";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 6
    }
  }
};

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackMessage: ""
    };
  }

  handleForgotPasswordSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const validEmail = values.email;
        axios
          .post(`/api/forgotpassword`, { email: validEmail })
          .then(res => {
            if (res.data === true) {
              this.setState({
                feedbackMessage: "Email sent successfully! Check your emails"
              });
            } else {
              this.setState({
                feedbackMessage: "Invalid email. Please try again."
              });
            }
            this.props.form.resetFields();
          })
          .catch(err => {
            message.error(`something went wrong. ${err}`);
          });
      }
    });
  };

  render() {
    // @ts-ignore
    const { pristine, submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    // @ts-ignore
    const { feedbackMessage } = this.state;

    return (
      <CardBase cardtitle="Reset Password">
        {feedbackMessage === "Invalid email. Please try again." ? (
          <div className="errorMessage">
            <Alert
              message="Email not found"
              description={feedbackMessage}
              type="error"
              showIcon
            />
          </div>
        ) : feedbackMessage === "Email sent successfully! Check your emails" ? (
          <div className="errorMessage">
            <Alert
              message="Success"
              description={feedbackMessage}
              type="success"
              showIcon
            />
          </div>
        ) : null}
        <Form onSubmit={this.handleForgotPasswordSubmit} hideRequiredMark>
          <FormItem {...formItemLayout} label="Email">
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "Please insert a valid email."
                }
              ]
            })(<Input placeholder="Email" type="email" />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              disabled={pristine || submitting}
              htmlType="submit"
            >
              Reset password
            </Button>
          </FormItem>
        </Form>
      </CardBase>
    );
  }
}

const WrappedForgotPassword = Form.create()(ForgotPassword);

export default WrappedForgotPassword;
