import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Icon } from "antd";

import star from "../data/images-sample/star.png";

class Ladder extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    // @ts-ignore
    const { tabKeyChanged } = this.props.tabsKeyReturned;
    const {
      All_ladder,
      _3D_Art_ladder,
      _2D_Art_ladder,
      Cosplay_ladder,
      Sculpture_ladder,
      Photography_ladder,
      Tatoos_ladder,
      Landscapery_ladder,
      Fashion_ladder,
      VideoGame_Screenarchery_ladder,
      Other_ladder
      // @ts-ignore
    } = this.props.ladderData;

    const scoreTitle = (
      <h3>
        Score <img src={star} height="24em" width="24em" alt="star" />
      </h3>
    );

    const rankTitle = (
      <h3>
        Rank{" "}
        <Icon type="trophy" theme="outlined" style={{ fontSize: "1.4em" }} />
      </h3>
    );

    const titleTitle = (
      <h3>
        Title{" "}
        <Icon type="form" theme="outlined" style={{ fontSize: "1.4em" }} />
      </h3>
    );

    const authorTitle = (
      <h3>
        Author{" "}
        <Icon type="user" theme="outlined" style={{ fontSize: "1.4em" }} />
      </h3>
    );

    const categoryTitle = (
      <h3>
        Category{" "}
        <Icon type="database" theme="outlined" style={{ fontSize: "1.4em" }} />
      </h3>
    );

    const columns = [
      {
        title: rankTitle,
        dataIndex: "key",
        key: "key",
        className: "color_white"
      },
      {
        title: scoreTitle,
        dataIndex: "likes_total",
        key: "likes_total",
        className: "color_white"
      },
      {
        title: titleTitle,
        dataIndex: "title",
        key: "title",
        className: "color_white"
      },
      {
        title: authorTitle,
        dataIndex: "username",
        key: "username",
        className: "color_white"
      },
      {
        title: categoryTitle,
        dataIndex: "category",
        key: "category",
        className: "color_white"
      }
    ];

    const Laddertable = (props: any) => {
      return (
        <Table
          dataSource={props.ladderInstancedData}
          bordered
          pagination={false}
          columns={columns}
          className="ladder"
        />
      );
    };

    return tabKeyChanged === "All" || tabKeyChanged === undefined ? (
      <Laddertable ladderInstancedData={All_ladder} />
    ) : tabKeyChanged === "3D Art" ? (
      <Laddertable ladderInstancedData={_3D_Art_ladder} />
    ) : tabKeyChanged === "2D Art" ? (
      <Laddertable ladderInstancedData={_2D_Art_ladder} />
    ) : tabKeyChanged === "Cosplay" ? (
      <Laddertable ladderInstancedData={Cosplay_ladder} />
    ) : tabKeyChanged === "Sculpture" ? (
      <Laddertable ladderInstancedData={Sculpture_ladder} />
    ) : tabKeyChanged === "Photography" ? (
      <Laddertable ladderInstancedData={Photography_ladder} />
    ) : tabKeyChanged === "Tatoos" ? (
      <Laddertable ladderInstancedData={Tatoos_ladder} />
    ) : tabKeyChanged === "Landscapery" ? (
      <Laddertable ladderInstancedData={Landscapery_ladder} />
    ) : tabKeyChanged === "Fashion" ? (
      <Laddertable ladderInstancedData={Fashion_ladder} />
    ) : tabKeyChanged === "VideoGame Screenarchery" ? (
      <Laddertable ladderInstancedData={VideoGame_Screenarchery_ladder} />
    ) : (
      <Laddertable ladderInstancedData={Other_ladder} />
    );
  }
}

function mapStateToProps(state: any) {
  return {
    ladderData: state.gallery,
    tabsKeyReturned: state.tabKeyChange
  };
}

export default connect(
  mapStateToProps,
  null
)(Ladder);
