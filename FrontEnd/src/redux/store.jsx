// store.js
import rootReducer from "./reduxReducer";

import { createStore, combineReducers } from "redux";

const rootReducerCombined = combineReducers({
  // Add other reducers here if needed
  app: rootReducer,
});

const store = createStore(rootReducerCombined);

export default store;
