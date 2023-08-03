// reduxReducer.js
import { STORE_POT_ID } from "./action";

const initialState = {
  potID: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_POT_ID:
      return {
        ...state,
        potID: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
