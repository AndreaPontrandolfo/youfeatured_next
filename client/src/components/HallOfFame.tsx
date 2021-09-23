import React from "react";
import { Icon } from "antd";
// @ts-ignore
import Media from "react-media";

const HallOfFame = () => {
  return (
    <React.Fragment>
      <header className="content_center">
        <h1 className="main_typography_theme_alt underline">Hall Of Fame</h1>
      </header>
      <Media query="(max-width: 1200px)">
        {(matches: any) =>
          matches ? (
            <h3
              style={{
                fontSize: "4em",
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, 0) scale(2, 3)",
                display: "inline-block",
                top: "50%",
                textAlign: "center",
                lineHeight: "0.8em"
              }}
            >
              No winners yet!
            </h3>
          ) : (
            <h3
              style={{
                fontSize: "8em",
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, 0) scale(2, 3)",
                display: "inline-block",
                top: "50%",
                textAlign: "center",
                lineHeight: "0.8em"
              }}
            >
              No winners yet!
            </h3>
          )
        }
      </Media>
      <Icon
        type="frown"
        theme="outlined"
        style={{
          fontSize: "80em",
          display: "flex",
          justifyContent: "center",
          color: "#4b4b4b"
        }}
      />
    </React.Fragment>
  );
};

export default HallOfFame;
