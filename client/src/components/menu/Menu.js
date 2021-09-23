import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;

const MenuComponent = ({
  onClickedMenuItem,
  selectedKey,
  menuMode,
  authentication,
  validPermission,
  downArrow,
  stringHome,
  stringArtworks,
  stringUpload,
  stringHallOfFame,
  stringAbout,
  stringSignin,
  stringAccount
}) => {
  return (
    <Menu
      onClick={onClickedMenuItem}
      selectedKeys={selectedKey}
      mode={menuMode}
      theme="light"
      className="myMenu"
    >
      <Menu.Item key="home">
        <span>
          <Link to="/" className="link_noDecoration padding_small">
            <Icon type="home" />
            {stringHome}
          </Link>
        </span>
      </Menu.Item>
      <SubMenu
        title={
          <span className="submenu-title-wrapper link_noDecoration">
            <Icon type="picture" theme="outlined" />
            {stringArtworks}
            {downArrow}
          </span>
        }
      >
        <Menu.Item key="gallery">
          <span>
            <Link to="/gallery" className="link_noDecoration">
              <Icon type="table" theme="outlined" />
              GALLERY
            </Link>
          </span>
        </Menu.Item>
        <Menu.Item key="ladder">
          <span>
            <Link to="/ladder" className="link_noDecoration">
              <Icon type="area-chart" theme="outlined" />
              LADDER
            </Link>
          </span>
        </Menu.Item>
      </SubMenu>
      {authentication && validPermission ? (
        <Menu.Item key="upload">
          <span>
            <Link to="/upload" className="link_noDecoration padding_small">
              <Icon type="upload" />
              {stringUpload}
            </Link>
          </span>
        </Menu.Item>
      ) : null}
      <Menu.Item key="hallOfFame" disabled>
        <span style={{ color: "#808080" }}>
          {/* <Link to="/hallOfFame" className="link_noDecoration padding_small"> */}
          <Icon type="trophy" theme="outlined" />
          {stringHallOfFame}
          {/* </Link> */}
        </span>
      </Menu.Item>
      <Menu.Item key="about">
        <span>
          <Link to="/about" className="link_noDecoration padding_small">
            <Icon type="info-circle" />
            {stringAbout}
          </Link>
        </span>
      </Menu.Item>
      {!authentication ? (
        <SubMenu
          title={
            <span className="submenu-title-wrapper link_noDecoration">
              <Icon type="user" theme="outlined" />
              {stringSignin}
              {downArrow}
            </span>
          }
        >
          <Menu.Item key="signin">
            <span>
              <Link to="/signin" className="link_noDecoration">
                <Icon type="unlock" />
                LOGIN
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item key="register">
            <span>
              <Link to="/signup" className="link_noDecoration">
                <Icon type="user-add" />
                REGISTER
              </Link>
            </span>
          </Menu.Item>
        </SubMenu>
      ) : null}
      {authentication ? (
        <SubMenu
          title={
            <span className="submenu-title-wrapper link_noDecoration">
              <Icon type="user" theme="outlined" />
              {stringAccount}
              {downArrow}
            </span>
          }
          style={{ marginRight: "2em" }}
        >
          <Menu.Item key="profile">
            <span>
              <Link to="/profile" className="link_noDecoration">
                <Icon type="idcard" />
                PROFILE
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item key="logout">
            <span>
              <Link to="/logout" className="link_noDecoration">
                <Icon type="user-delete" theme="outlined" />
                LOGOUT
              </Link>
            </span>
          </Menu.Item>
        </SubMenu>
      ) : null}
    </Menu>
  );
};

export default MenuComponent;
