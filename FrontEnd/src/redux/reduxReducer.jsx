// reduxReducer.js

import { SAVE_POT_ID, SAVE_GARDEN_ID } from "./action";

const initialState = {
  potID: null,
  gardenID: null,
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
    default:
      return state;
  }
};

export default reducer;
