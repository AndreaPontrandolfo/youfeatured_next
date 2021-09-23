import React from "react";

/* export interface FullscreenImgSFC {
  image: any;
} */

// - const FullscreenImg: React.SFC<FullscreenImgSFC> = ({ image }) => {
const FullscreenImg = (image: any) => {
  return (
    <img
      src={image.index}
      height="100%"
      width="100%"
      object-fit="cover"
      alt="Image not found"
    />
  );
};

export default FullscreenImg;
