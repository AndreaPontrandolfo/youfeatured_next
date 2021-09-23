import { SET_GALLERY_DATA } from "../actions/types";
import { categories } from "../helpers/categories";

const initialState = {
  All: [],
  _3D_Art: [],
  _2D_Art: [],
  Cosplay: [],
  Sculpture: [],
  Photography: [],
  Tatoos: [],
  Landscapery: [],
  Fashion: [],
  VideoGame_Screenarchery: [],
  Other: [],
  total_comments: [],
  All_ladder: [],
  _3D_Art_ladder: [],
  _2D_Art_ladder: [],
  Cosplay_ladder: [],
  Sculpture_ladder: [],
  Photography_ladder: [],
  Tatoos_ladder: [],
  Landscapery_ladder: [],
  Fashion_ladder: [],
  VideoGame_Screenarchery_ladder: [],
  Other_ladder: [],
  total_comments_ladder: []
};

/// Da qui passano i dati della GALLERY gli aggiungiamo un campo key/value pair con la posizione incrementale, prima che raggiungano il componente.
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GALLERY_DATA:
      const settingGalleryData = action.total_images_payload;
      const settingLadderData = action.ladder_payload;

      const _3D_Art_category = settingGalleryData.filter(
        element => element.category === "3D Art"
      );
      const _2D_Art_category = settingGalleryData.filter(
        element => element.category === "2D Art"
      );
      const Cosplay_category = settingGalleryData.filter(
        element => element.category === "Cosplay"
      );
      const Sculpture_category = settingGalleryData.filter(
        element => element.category === "Sculpture"
      );
      const Photography_category = settingGalleryData.filter(
        element => element.category === "Photography"
      );
      const Tatoos_category = settingGalleryData.filter(
        element => element.category === "Tatoos"
      );
      const Landscapery_category = settingGalleryData.filter(
        element => element.category === "Landscapery"
      );
      const Fashion_category = settingGalleryData.filter(
        element => element.category === "Fashion"
      );
      const VideoGame_Screenarchery_category = settingGalleryData.filter(
        element => element.category === "VideoGame Screenarchery"
      );
      const Other_category = settingGalleryData.filter(
        element => element.category === "Other"
      );

      const _3D_Art_category_ladder = settingLadderData.filter(
        element => element.category === "3D Art"
      );
      const _2D_Art_category_ladder = settingLadderData.filter(
        element => element.category === "2D Art"
      );
      const Cosplay_category_ladder = settingLadderData.filter(
        element => element.category === "Cosplay"
      );
      const Sculpture_category_ladder = settingLadderData.filter(
        element => element.category === "Sculpture"
      );
      const Photography_category_ladder = settingLadderData.filter(
        element => element.category === "Photography"
      );
      const Tatoos_category_ladder = settingLadderData.filter(
        element => element.category === "Tatoos"
      );
      const Landscapery_category_ladder = settingLadderData.filter(
        element => element.category === "Landscapery"
      );
      const Fashion_category_ladder = settingLadderData.filter(
        element => element.category === "Fashion"
      );
      const VideoGame_Screenarchery_category_ladder = settingLadderData.filter(
        element => element.category === "VideoGame Screenarchery"
      );
      const Other_category_ladder = settingLadderData.filter(
        element => element.category === "Other"
      );

      return {
        ...state,
        All: settingGalleryData,
        _3D_Art: _3D_Art_category,
        _2D_Art: _2D_Art_category,
        Cosplay: Cosplay_category,
        Sculpture: Sculpture_category,
        Photography: Photography_category,
        Tatoos: Tatoos_category,
        Landscapery: Landscapery_category,
        Fashion: Fashion_category,
        VideoGame_Screenarchery: VideoGame_Screenarchery_category,
        Other: Other_category,
        total_comments: action.total_comments_payload,
        All_ladder: settingLadderData,
        _3D_Art_ladder: _3D_Art_category_ladder,
        _2D_Art_ladder: _2D_Art_category_ladder,
        Cosplay_ladder: Cosplay_category_ladder,
        Sculpture_ladder: Sculpture_category_ladder,
        Photography_ladder: Photography_category_ladder,
        Tatoos_ladder: Tatoos_category_ladder,
        Landscapery_ladder: Landscapery_category_ladder,
        Fashion_ladder: Fashion_category_ladder,
        VideoGame_Screenarchery_ladder: VideoGame_Screenarchery_category_ladder,
        Other_ladder: Other_category_ladder
      };
    default:
      return state;
  }
}
