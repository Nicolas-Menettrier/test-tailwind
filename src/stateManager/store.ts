import { configureStore } from "@reduxjs/toolkit";

import iTunesAlbumReducer from "./slices/iTunesAlbum.reducer";

const store = configureStore({
  reducer: {
    iTunes: iTunesAlbumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
