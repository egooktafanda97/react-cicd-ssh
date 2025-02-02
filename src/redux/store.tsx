import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk"; // Import as a named export
import reducer from "./reducer";

const store = configureStore({
  reducer: reducer,
// middleware: [thunk], // Pass the middleware as an array
});

export default store;