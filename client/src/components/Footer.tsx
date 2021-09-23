import React from "react";
import { Divider, Row, Col } from "antd";

import logo from "../data/images-sample/YouFeatured_Logo_Finalizing.svg";
import Facebook from "../data/images-sample/Facebook_icon.png";
import Twitter from "../data/images-sample/Twitter_icon.png";
import Instagram from "../data/images-sample/Instagram_icon.png";
import Flickr from "../data/images-sample/Flickr_icon.png";

const socialIconsArray = [Facebook, Twitter, Instagram, Flickr];

const legalItemsArray = [
  "Sitemap",
  "Terms of Service",
  "Privacy Policy",
  "Cookie Usage"
];

/// Necessary coaleshe algorithm.
const LegalItemsList = (
  <ul>
    {legalItemsArray.map((element, i) => (
      <li className="commentListFooter display_inline" key={i}>
        {!(i === legalItemsArray.length - 1) ? (
          <React.Fragment>
            <span style={{ color: "#fff" }}>{element}</span>{" "}
            <Divider
              type="vertical"
              style={{ backgroundColor: "rgba(141, 141, 141, 0.7)" }}
            />
          </React.Fragment>
        ) : (
          <span style={{ color: "#fff" }}>{element}</span>
        )}
      </li>
    ))}
  </ul>
);

const SocialIconsList = (
  <ul>
    {socialIconsArray.map((element, i) => (
      <li className="commentListFooter display_inline margin_right" key={i}>
        <img src={element} width="36em" height="36em" alt="Social Icon" />
      </li>
    ))}
  </ul>
);

const Footer = () => {
  return (
    <section className="content_center_image">
      <Row type="flex" justify="space-around" align="middle">
        <Col>
          <h1 className="main_typography_theme">
            <img src={logo} height="65em" width="65em" alt="YouFeatured" />
            &emsp;YOUFEATURED
          </h1>
        </Col>
        <Col>{LegalItemsList}</Col>
        <Col offset={2}>
          <div>
            <p style={{ color: "#b9b9b9a6" }}>Connect with us!</p>
            {SocialIconsList}
          </div>
        </Col>
      </Row>
      <Divider style={{ backgroundColor: "rgba(141, 141, 141, 1)" }} />
      <p style={{ color: "#b9b9b9a6" }}>
        &copy; YouFeatured.com 2018, Andrea Pontrandolfo. All rights reserved.
      </p>
    </section>
  );
};

export default Footer;
