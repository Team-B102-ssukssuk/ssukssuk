// store.js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reduxReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
