import React, { Component } from "react";
import { Tabs, BackTop, Menu, Button, Row, Col } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import CategoriesTabs from "./CategoriesTabs";
import { categories } from "../../helpers/categories";
import {
  currentTabKey,
  fetchGallery,
  setSectionTab
} from "../../actions/actionCreators";
import Gallery from "./Gallery";
import Ladder from "../Ladder";

const TabPane = Tabs.TabPane;

class ArtworksSuperWrapper extends Component {
  constructor(props) {
    super(props);
  }

  tabsCallback = tabsKey => {
    this.props.currentTabKey({ tabsKey });
  };

  componentDidMount() {
    this.props.fetchGallery();
    // - this.props.fetchTotalCommentsPerImage();
  }

  refreshGallery = e => {
    e.preventDefault();
    this.props.fetchGallery();
  };

  handleClick = e => {
    this.props.setSectionTab(e.key);
  };

  render() {
    const { tabKeyChanged } = this.props.tabsKeyReturned;
    /// Im using React Router props to change programmatically the selectedKey of the ArtworksWrapper Menù.
    const currentSelectedRoute = this.props.currentRoute.substring(1);

    const refreshGalleryButton = (
      <Button
        type="primary"
        icon="reload"
        onClick={this.refreshGallery}
        className="button_push-down"
      >
        Refresh
      </Button>
    );

    const GalleryCategoriesTabPanes = categories.map(category => (
      <TabPane tab={<h3>{category}</h3>} key={category}>
        <Gallery {...this.props} />
      </TabPane>
    ));

    const LadderCategoriesTabPanes = categories.map(category => (
      <TabPane tab={<h3>{category}</h3>} key={category}>
        <Ladder {...this.props} />
      </TabPane>
    ));

    return (
      <div>
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[currentSelectedRoute]}
              mode="horizontal"
              theme="light"
              className="artworksWrapperMenu"
            >
              <Menu.Item key="gallery">
                <Link to="/gallery" className="menu_logo">
                  <header>
                    <h1 className="main_typography_theme_alt custom_h1">
                      Gallery
                    </h1>
                  </header>
                </Link>
              </Menu.Item>
              <Menu.Item key="ladder">
                <Link to="/ladder" className="menu_logo">
                  <header>
                    <h1 className="main_typography_theme_alt custom_h1">
                      Rankings Chart
                    </h1>
                  </header>
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col>{refreshGalleryButton}</Col>
        </Row>
        <br />
        <br />
        <BackTop />
        {currentSelectedRoute === "gallery" ? (
          <CategoriesTabs
            defaultActiveKey={tabKeyChanged || "All"}
            onChange={this.tabsCallback}
            categoryContents={<Gallery {...this.props} />}
            allCategoriesContents={GalleryCategoriesTabPanes}
          />
        ) : (
          <CategoriesTabs
            defaultActiveKey={tabKeyChanged || "All"}
            onChange={this.tabsCallback}
            categoryContents={<Ladder {...this.props} />}
            allCategoriesContents={LadderCategoriesTabPanes}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gallery_categories: state.gallery,
    tabsKeyReturned: state.tabKeyChange,
    currentRoute: state.router.location.pathname
  };
}

export default connect(
  mapStateToProps,
  {
    currentTabKey,
    fetchGallery,
    setSectionTab
  }
)(ArtworksSuperWrapper);
