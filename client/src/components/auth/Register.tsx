import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Input, Alert } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { registerUser } from "../../actions/actionCreators";
import CardBase from "../CardBase";

interface IRegisterFormProps extends FormComponentProps {
  handleSubmit(event: React.SyntheticEvent<any>): any;
  pristine: any;
  submitting(event: React.SyntheticEvent<any>): any;
  errorMessage: string;
  registerUser(event: React.SyntheticEvent<any>): any;
}

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

class Register extends Component<IRegisterFormProps, any> {
  /// We created a function, handleFormSubmit(), which calls our registerUser() action creator with the form inputs (formProps) as an argument, and we tell our form to call that function when the form is submitted.
  constructor(props: any) {
    super(props);
  }

  handleRegisterFormSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.registerUser(values);
      }
    });
  };

  render() {
    // @ts-ignore
    const { pristine, submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    // @ts-ignore
    const { error } = this.props.errorMessage;

    return (
      <CardBase cardtitle="Register">
        {error !== "" ? (
          <div className="errorMessage">
            <Alert
              message="Invalid credentials!"
              description={error}
              type="error"
              showIcon
            />
          </div>
        ) : null}
        <Form onSubmit={this.handleRegisterFormSubmit} hideRequiredMark>
          <FormItem {...formItemLayout} label="Username">
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please insert a valid username."
                },
                {
                  min: 2,
                  max: 25,
                  message:
                    "The username lenght must be beetween 2-25 characters long."
                },
                {
                  pattern: /^[a-z0-9_]+$/i,
                  message:
                    "The username can only contain letters, numbers and underscores."
                }
              ]
            })(<Input placeholder="Username" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Email">
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please insert a valid email."
                },
                {
                  type: "email",
                  message: "Must be a valid email."
                }
              ]
            })(<Input placeholder="Email" type="email" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Password">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please insert a valid password."
                },
                {
                  min: 6,
                  max: 30,
                  pattern: /\d/,
                  message:
                    "The password lenght must be beetween 6-30 characters long and contain atleast 1 number."
                }
              ]
            })(<Input placeholder="Password" type="password" />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              disabled={pristine || submitting}
              htmlType="submit"
            >
              Register
            </Button>
            <div>
              Already have an account?
              <Link to="/signin" className="link_noDecoration">
                {" "}
                Login!
              </Link>
            </div>
          </FormItem>
        </Form>
      </CardBase>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    errorMessage: state.auth
  };
}

const WrappedRegister = Form.create()(Register);

export default connect(
  mapStateToProps,
  { registerUser }
  // @ts-ignore
)(WrappedRegister);
