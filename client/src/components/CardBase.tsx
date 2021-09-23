import React from "react";
import { Card } from "antd";
// @ts-ignore
import Media from "react-media";

// @ts-ignore
const CardBase = props => {
  return (
    <Media query="(max-width: 1100px)">
      {(matches: any) =>
        matches ? (
          <Card
            style={{
              width: "100%",
              top: "3em",
              margin: "0 auto",
              boxShadow: "0px 4px 13px 1px rgba(0, 0, 0, 0.6)"
            }}
            title={
              <h2 className="secondary_typography_theme_alt">
                {props.cardtitle}
              </h2>
            }
            headStyle={{ textAlign: "center" }}
            bordered
            {...props}
          />
        ) : (
          <Card
            style={{
              width: "50%",
              minWidth: "70em",
              top: "3em",
              margin: "0 auto",
              boxShadow: "0px 4px 13px 1px rgba(0, 0, 0, 0.6)"
            }}
            title={
              <h2 className="secondary_typography_theme_alt">
                {props.cardtitle}
              </h2>
            }
            headStyle={{ textAlign: "center" }}
            bordered
            {...props}
          />
        )
      }
    </Media>
  );
};

export default CardBase;
