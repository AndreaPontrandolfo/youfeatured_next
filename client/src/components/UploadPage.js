import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Upload,
  Button,
  Icon,
  message,
  Form,
  Input,
  Select,
  Alert
} from "antd";

import { categories } from "../helpers/categories";
import CardBase from "./CardBase";
import config from "../config";
import { addStar } from "../actions/actionCreators";
import { checkForMaxUploads } from "../actions/actionCreators";

//// Implement redirect once the upload is done and the possibility to use a link to another website instead of uploading an image

const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const Option = Select.Option;

class UploadPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileList: [],
      uploading: false
    };
  }

  componentDidMount() {
    const user_id = this.props.auth.uid;
    this.props.checkForMaxUploads({ user_id });
  }

  handleUpload = e => {
    e.preventDefault();
    const { valid } = this.props.uploadValidityCheck;
    this.props.form.validateFields((err, values) => {
      if (!err && valid) {
        const { fileList } = this.state;
        const formData = new FormData();
        formData.append("file", fileList[0]);
        formData.append("upload_preset", "youfeatured-upload-preset");
        formData.append("api_key", config.api_key);
        formData.append("timestamp", (Date.now() / 1000) | 0);
        this.setState({
          uploading: true
        });

        axios
          .post(
            `https://api.cloudinary.com/v1_1/${config.cloudname}/image/upload`,
            formData
          )
          .then(response => {
            this.setState({
              fileList: [],
              uploading: false
            });
            message.success("upload successfull!");
            const data = response.data;
            /// Url to store in the database
            const fileURL = data.secure_url;
            const imageWidth = data.width;
            const imageHeight = data.height;
            const artworkTitle = values.title;
            const category = values.category;
            const userId = this.props.auth.uid;
            axios
              .post("/api/upload/image", {
                fileURL,
                imageWidth,
                imageHeight,
                artworkTitle,
                category,
                userId
              })
              .then(res => {
                if (typeof res.data.id === "number") {
                  const imageId = res.data.id;
                  this.props.addStar({ user_id: userId, image_id: imageId });
                  this.props.checkForMaxUploads({ user_id: userId });
                  message.success("image saved successfully!");
                } else {
                  message.error("something went wrong. Image not saved.");
                }
                this.props.form.resetFields();
              })
              .catch(err => {
                message.error(`something went wrong. ${err}`);
              });
          })
          .catch(error => {
            console.log(error);
            this.setState({
              uploading: false
            });
            message.error("upload failed.");
          });
      }
    });
  };

  render() {
    const { uploading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { valid } = this.props.uploadValidityCheck;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          offset: 0
        },
        sm: {
          offset: 12
        }
      }
    };

    const DraggerInfoNotice = (
      <div className="about-content">
        <p>Click or drag file to this area to upload.</p>
        <p>Only JPG and PNG files are allowed. Max size: 10MB.</p>
        <p><strong> Please only upload photos that you own the rights to.</strong></p>
      </div>
    );

    const DraggerWarningNotice = (
      <div className="about-content">
        <p>You can only upload 3 images max per month!</p>
        {/* <p>Uploads left: number.</p> */}
        <p>
          If you want to upload the second and third image you must assign at
          least 1 star to another artwork!
        </p>
      </div>
    );

    const CategoriesOptions = categories.map((category, i) => (
      <Option value={category} key={i}>
        {category}
      </Option>
    ));

    const uploadProps = {
      action:
        "https://api.cloudinary.com/v1_1/youfeatured-cloudname/image/upload",
      beforeUpload: file => {
        const mustBeJPGorPNG =
          file.type === "image/jpeg" || "image/png" || "image/jpg";
        const isMaxSize10MB = file.size / 1024 / 1024 < 10;
        if (!mustBeJPGorPNG) {
          message.error("You can only upload JPG or PNG files.");
          return false;
        } else if (!isMaxSize10MB) {
          message.error(
            "Image max size limit is 10MB. Plaese upload a smaller image file."
          );
          return false;
        } else {
          this.setState(({ fileList }) => ({
            fileList: [...fileList, file]
          }));
          return false;
        }
      },
      fileList: this.state.fileList
    };

    return (
      <CardBase cardtitle="Upload your images here!">
        <Form onSubmit={this.handleUpload} hideRequiredMark>
          <FormItem
            colon={false}
            {...formItemLayout}
            label={
              <h2 className="tertiary_typography_theme margin_right">Title</h2>
            }
          >
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please give a name to your artwork."
                },
                {
                  max: 30,
                  message: "Max 30 characters allowed."
                }
              ]
            })(<Input placeholder="Title" />)}
          </FormItem>
          <FormItem
            colon={false}
            {...formItemLayout}
            label={
              <h2 className="tertiary_typography_theme margin_right">
                Category
              </h2>
            }
          >
            {getFieldDecorator("category", {
              rules: [
                {
                  required: true,
                  message:
                    "You need to select a category for your artwork to proceed!"
                }
              ]
            })(
              <Select placeholder="Choose category">{CategoriesOptions}</Select>
            )}
          </FormItem>
          <FormItem
            colon={false}
            {...formItemLayout}
            label={
              <h2 className="tertiary_typography_theme margin_right">Image</h2>
            }
          >
            {getFieldDecorator("image", {
              rules: [
                {
                  required: true,
                  message: "Please pick a image file."
                },
                {
                  type: "object",
                  message: "Only images allowed."
                }
              ]
            })(
              <Dragger
                {...uploadProps}
                multiple={false}
                accept=".jpg, .jpeg, .png"
              >
                <div className="ant-upload-text">
                  <Alert
                    message={
                      <h2 className="tertiary_typography_theme">Info</h2>
                    }
                    description={DraggerInfoNotice}
                    type="info"
                    showIcon
                    style={{ margin: "3em" }}
                  />
                  <Alert
                    message={
                      <h2 className="tertiary_typography_theme">
                        Remember the rules
                      </h2>
                    }
                    description={DraggerWarningNotice}
                    type="warning"
                    showIcon
                    style={{ margin: "3em" }}
                  />
                </div>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
              </Dragger>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              className="upload-demo-start"
              id="upload_button"
              type="primary"
              htmlType="submit"
              disabled={this.state.fileList.length === 0 || !valid}
              loading={uploading}
            >
              {uploading ? "Uploading" : "Upload"}
            </Button>
          </FormItem>
        </Form>
        {!valid ? (
          <Alert
            message="Warning"
            description="Max number of uploads reached for this month."
            type="warning"
            showIcon
          />
        ) : null}
        {!valid ? <Redirect to="/gallery" push /> : null}
      </CardBase>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    uploadValidityCheck: state.uploadValidityCheck
  };
}

const WrappedUpload = Form.create()(UploadPage);

export default connect(
  mapStateToProps,
  { checkForMaxUploads, addStar }
)(WrappedUpload);
