import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import logo from "../../data/images-sample/YouFeatured_Logo_Finalizing.svg";

const MenuWrapper = (props: any) => {
  return (
    <div className="fullHeader">
      <Row type="flex" justify="space-between" align="middle">
        <Col offset={1}>
          <Link to="/" className="menu_logo">
            <header>
              <h1 className="main_typography_theme custom_h1">
                <img
                  src={logo}
                  height="50em"
                  width="50em"
                  alt="YouFeatured_Logo"
                />
                &emsp; YOUFEATURED
              </h1>
            </header>
          </Link>
        </Col>
        <Col>{props.children}</Col>
      </Row>
    </div>
  );
};

export default MenuWrapper;
