import React, { Component } from "react";
import { connect } from "react-redux";
import PhotoGallery from "react-photo-gallery";
import Measure from "react-measure";

import Photo from "./Photo";

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: -1
    };
  }

  render() {
    const { width } = this.state;
    const {
      All,
      _3D_Art,
      _2D_Art,
      Cosplay,
      Sculpture,
      Photography,
      Tatoos,
      Landscapery,
      Fashion,
      VideoGame_Screenarchery,
      Other
    } = this.props.gallery_categories;
    const { tabKeyChanged } = this.props.tabsKeyReturned;

    return (
      <Measure
        bounds
        onResize={contentRect =>
          this.setState({ width: contentRect.bounds.width })
        }
      >
        {({ measureRef }) => {
          if (width < 1) {
            return <div ref={measureRef} />;
          }
          let columns = 1;
          if (width >= 480) {
            columns = 2;
          }
          if (width >= 1024) {
            columns = 3;
          }
          if (width >= 1824) {
            columns = 4;
          }
          return (
            <div ref={measureRef}>
              {tabKeyChanged === "All" || tabKeyChanged === undefined ? (
                <PhotoGallery
                  photos={All}
                  columns={columns}
                  ImageComponent={Photo}
                />
              ) : tabKeyChanged === "3D Art" ? (
                <PhotoGallery
                  photos={_3D_Art}
                  columns={columns}
                  ImageComponent={Photo}
                />
              ) : tabKeyChanged === "2D Art" ? (
                <PhotoGallery
                  photos={_2D_Art}
                  columns={columns}
                  ImageComponent={Photo}
                />
              ) : tabKeyChanged === "Cosplay" ? (
                <PhotoGallery
                  photos={Cosplay}
                  columns={columns}
                  ImageComponent={Photo}
                />
              ) : tabKeyChanged === "Sculpture" ? (
                <PhotoGallery
                  photos={Sculpture}
                  columns={columns}
                  ImageComponent={Photo}
                />
              ) : tabKeyChanged === "Photography" ? (
                <PhotoGallery
                  photos={Photography}
                  columns={columns}
                  ImageComponent={Photo}
                />
              ) : tabKeyChanged === "Tatoos" ? (
                <PhotoGallery
                  photos={Tatoos}
                  columns={columns}
                  ImageComponent={Photo}
                />
              ) : tabKeyChanged === "Landscapery" ? (
                <PhotoGallery
                  photos={Landscapery}
                  columns={columns}
                  ImageComponent={Photo}
                />
              ) : tabKeyChanged === "Fashion" ? (
                <PhotoGallery
                  photos={Fashion}
                  columns={columns}
                  ImageComponent={Photo}
                />
              ) : tabKeyChanged === "VideoGame Screenarchery" ? (
                <PhotoGallery
                  photos={VideoGame_Screenarchery}
                  columns={columns}
                  ImageComponent={Photo}
                />
              ) : (
                <PhotoGallery
                  photos={Other}
                  columns={columns}
                  ImageComponent={Photo}
                />
              )}
            </div>
          );
        }}
      </Measure>
    );
  }
}

function mapStateToProps(state) {
  return {
    gallery_categories: state.gallery,
    tabsKeyReturned: state.tabKeyChange
  };
}

export default connect(
  mapStateToProps,
  null
)(Gallery);
