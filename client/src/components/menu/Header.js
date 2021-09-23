import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon, Dropdown, Col, Row } from "antd";
import Media from "react-media";

import {
  checkForMaxUploads,
  setSectionTab
} from "../../actions/actionCreators";
import Logo from "../../data/images-sample/YouFeatured_Logo_Finalizing.svg";
import MenuComponent from "./Menu";
import MenuWrapper from "./MenuWrapper";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    current: "home"
  };

  componentDidMount() {
    /// This call to the database will happen only if the store confirms that the user is already authenticated.
    const { authenticated, uid } = this.props.auth;
    if (authenticated) {
      this.props.checkForMaxUploads({ user_id: uid });
    }
  }

  handleClick = e => {
    this.props.setSectionTab(e.key);
    this.setState({
      current: e.key
    });
  };

  render() {
    const { authenticated } = this.props.auth;
    const { valid } = this.props.uploadValidityCheck;

    const downArrow = (
      <Icon
        type="caret-down"
        theme="outlined"
        style={{ marginLeft: "0.5em" }}
      />
    );

    const MenuMobile = (
      <MenuComponent
        onClickedMenuItem={this.handleClick}
        selectedKey={[this.state.current]}
        menuMode="inline"
        authentication={authenticated}
        validPermission={valid}
        downArrow={null}
        stringHome="HOME"
        stringArtworks="ARTWORKS"
        stringUpload="UPLOAD"
        stringHallOfFame="HALL OF FAME"
        stringAbout="ABOUT"
        stringSignin="SIGNIN"
        stringAccount="ACCOUNT"
      />
    );

    return (
      <Media query="(max-width: 1200px)">
        {matches =>
          matches ? (
            <React.Fragment>
              <span style={{ float: "left", margin: "1em" }}>
                <Link to="/">
                  <img
                    src={Logo}
                    height="40em"
                    width="40em"
                    alt="YouFeatured"
                  />
                </Link>
              </span>
              <Dropdown
                overlay={MenuMobile}
                trigger={["click"]}
                placement="bottomLeft"
                className="menu_items_mobile"
              >
                <a
                  className="ant-dropdown-link"
                  href="#"
                  style={{ color: "rgb(140, 84, 230)" }}
                >
                  <Icon
                    type="menu-unfold"
                    theme="outlined"
                    style={{ fontSize: "3em" }}
                  />
                </a>
              </Dropdown>
            </React.Fragment>
          ) : (
            <Media query="(max-width: 1750px)">
              {matches =>
                matches ? (
                  <MenuWrapper>
                    <MenuComponent
                      onClickedMenuItem={this.handleClick}
                      selectedKey={[this.state.current]}
                      menuMode="horizontal"
                      authentication={authenticated}
                      validPermission={valid}
                      downArrow={downArrow}
                      stringHome={null}
                      stringArtworks={null}
                      stringUpload={null}
                      stringHallOfFame={null}
                      stringAbout={null}
                      stringSignin={null}
                      stringAccount={null}
                    />
                  </MenuWrapper>
                ) : (
                  <MenuWrapper>
                    <MenuComponent
                      onClickedMenuItem={this.handleClick}
                      selectedKey={[this.state.current]}
                      menuMode="horizontal"
                      authentication={authenticated}
                      validPermission={valid}
                      downArrow={downArrow}
                      stringHome="HOME"
                      stringArtworks="ARTWORKS"
                      stringUpload="UPLOAD"
                      stringHallOfFame="HALL OF FAME"
                      stringAbout="ABOUT"
                      stringSignin="SIGNIN"
                      stringAccount="ACCOUNT"
                    />
                  </MenuWrapper>
                )
              }
            </Media>
          )
        }
      </Media>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    uploadValidityCheck: state.uploadValidityCheck
  };
}

export default connect(
  mapStateToProps,
  { checkForMaxUploads, setSectionTab }
)(Header);
