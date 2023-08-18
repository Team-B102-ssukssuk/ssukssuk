// reduxReducer.js

import {
  SAVE_POT_ID,
  SAVE_GARDEN_ID,
  NOTIFICATION_TOKEN,
  TOGGLE_BACKGROUND_MUSIC,
} from "./action";

const initialState = {
  potID: null,
  gardenID: null,
  notificationToken: null,
  isBackgroundMusicPlaying: false, // 배경음악 상태 추가
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_POT_ID:
      return {
        ...state,
        potID: action.potID,
      };
    case SAVE_GARDEN_ID:
      return {
        ...state,
        gardenID: action.gardenID,
      };
    case NOTIFICATION_TOKEN:
      return {
        ...state,
        notificationToken: action.notificationToken,
      };
    case TOGGLE_BACKGROUND_MUSIC: // 배경음악 토글 액션 처리
      return {
        ...state,
        isBackgroundMusicPlaying: action.isBackgroundMusicPlaying,
      };
    default:
      return state;
  }
};

export default reducer;
