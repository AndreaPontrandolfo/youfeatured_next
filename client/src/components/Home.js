import React from "react";
import ProgressiveImage from "react-progressive-image";
import Media from "react-media";

import imageOfTheMonth_desktop_large from "../data/images-sample/amir-akbari-1106145-unsplash_resized.jpg";
import imageOfTheMonth_desktop_placeholder from "../data/images-sample/highcompress-amir-akbari-1106145-unsplash_resized.jpg";
import imageOfTheMonth_mobile_large from "../data/images-sample/Ciclope_fullbody_3.jpg";
import imageOfTheMonth_mobile_placeholder from "../data/images-sample/highcompress-Ciclope_fullbody_3.jpg";

const Home = () => {
  return (
    <div className="content_center">
      <Media query="(max-width: 1200px)">
        {matches =>
          matches ? (
            <ProgressiveImage
              src={imageOfTheMonth_mobile_large}
              placeholder={imageOfTheMonth_mobile_placeholder}
            >
              {src => (
                <img
                  src={src}
                  alt="Winner of the month - Mobiles"
                  className="homepage_image_fullCover"
                />
              )}
            </ProgressiveImage>
          ) : (
            <ProgressiveImage
              src={imageOfTheMonth_desktop_large}
              placeholder={imageOfTheMonth_desktop_placeholder}
            >
              {src => (
                <img
                  src={src}
                  alt="Winner of the month - Desktops"
                  className="homepage_image_fullCover"
                />
              )}
            </ProgressiveImage>
          )
        }
      </Media>
    </div>
  );
};

export default Home;

/// Dati da displayare sull'immagine, con una transizione smooth (right-to-eft slide-in):
/// Winner of YouFeatured October 2018 Competition
/// Title: The ladies
/// Author Andrea Pontrandolfo
/// Category: 3D Art
