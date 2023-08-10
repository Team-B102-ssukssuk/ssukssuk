// reduxReducer.js

import { SAVE_POT_ID, SAVE_GARDEN_ID, NOTIFICATION_TOKEN } from "./action";

const initialState = {
  potID: null,
  gardenID: null,
  notificationToken: null,
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
    default:
      return state;
  }
};

export default reducer;
