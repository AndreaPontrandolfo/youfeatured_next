import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Alert, Input, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";

import CardBase from "../CardBase";
import { loginUser } from "../../actions/actionCreators";

interface IRegisterFormProps extends FormComponentProps {
  handleSubmit(event: React.SyntheticEvent<any>): any;
  pristine: any;
  submitting(event: React.SyntheticEvent<any>): any;
  errorMessage: string;
  loginUser(event: React.SyntheticEvent<any>): any;
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

class Login extends Component<IRegisterFormProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      passwordDisplaySwitch: "password"
    };
  }

  handleLoginSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.loginUser(values);
      }
    });
  };

  showPassword = (e: any) => {
    e.preventDefault();
    if (this.state.passwordDisplaySwitch === "password") {
      this.setState({
        passwordDisplaySwitch: "text"
      });
    } else {
      this.setState({
        passwordDisplaySwitch: "password"
      });
    }
  };

  render() {
    // @ts-ignore
    const { pristine, submitting } = this.props;
    const { passwordDisplaySwitch } = this.state;
    const { getFieldDecorator } = this.props.form;
    // @ts-ignore
    const { error } = this.props.errorMessage;

    return (
      <CardBase cardtitle="Login">
        {error !== "" ? (
          <div className="errorMessage">
            <Alert
              message="Authentication Failed!"
              description={error}
              type="error"
              showIcon
            />
          </div>
        ) : null}
        <Form onSubmit={this.handleLoginSubmit} hideRequiredMark>
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
          <FormItem {...formItemLayout} label="Password">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please insert a valid password."
                }
              ]
            })(
              <Input
                placeholder="Password"
                type={passwordDisplaySwitch}
                addonAfter={
                  <Icon
                    type="eye"
                    theme="outlined"
                    onClick={this.showPassword}
                    style={{ userSelect: "none", cursor: "pointer" }}
                  />
                }
              />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              disabled={pristine || submitting}
              htmlType="submit"
            >
              Login
            </Button>
            <div>
              <Link to="/signup" className="link_noDecoration">
                Not registered yet?
              </Link>
            </div>
            <div>
              <Link to="/forgotpassword" className="link_noDecoration">
                Forgot password?
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

const WrappedLogin = Form.create()(Login);

export default connect(
  mapStateToProps,
  { loginUser }
  // @ts-ignore
)(WrappedLogin);
