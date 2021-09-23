/// Loadable HOC
import React from "react";
import { Skeleton, Spin } from "antd";
import Loadable from "react-loadable";

function LoadingSkeletonF(props) {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    return <Skeleton active />;
  } else {
    return null;
  }
}

function LoadingCircleF(props) {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    return (
      <Spin
        tip="Loading..."
        size="large"
        style={{ paddingLeft: "50%", paddingTop: "20%" }}
      />
    );
  } else {
    return null;
  }
}

export const LoadableSkeleton = func =>
  Loadable({
    loader: func,
    loading: LoadingSkeletonF,
    delay: 300
  });

export const LoadingCircle = func =>
  Loadable({
    loader: func,
    loading: LoadingCircleF,
    delay: 300
  });
