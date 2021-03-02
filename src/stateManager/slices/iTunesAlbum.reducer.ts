import { createSlice } from "@reduxjs/toolkit";

import _ from "lodash";

import { ItunesAlbum, Playlist } from "../../services/itunesApi.types";

interface IInitialState {
  initialArray: Array<ItunesAlbum>;
  filteredArray: Array<ItunesAlbum>;
}

const initialState: IInitialState = {
  initialArray: [],
  filteredArray: [],
};

const filteredById = (
  iTunesAlbum: Array<ItunesAlbum>,
  id: string,
  favorite: boolean
): Array<ItunesAlbum> =>
  iTunesAlbum.map((el) =>
    el.id.attributes["im:id"] === id ? { ...el, favorite } : el
  );

export const iTunesAlbumSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    filterByCategory: (state, action: { payload: string }) => {
      if (action.payload) {
        return {
          ...state,
          filteredArray: state.initialArray.filter(
            (el) => el.category.attributes.label === action.payload
          ),
        };
      }
      return { ...state, filteredArray: state.initialArray };
    },
    filterByFavorite: (state, action: { payload: boolean }) => {
      if (action.payload)
        return {
          ...state,
          filteredArray: state.initialArray.filter((el) => el.favorite),
        };
      return { ...state, filteredArray: state.initialArray };
    },
    filterByArtistAndAlbum: (state, action: { payload: string }) => {
      if (action.payload) {
        const filter = _.deburr(_.toLower(action.payload));

        return {
          ...state,
          filteredArray: state.initialArray.filter((el) => {
            const toFilterAlbum = _.deburr(_.toLower(el["im:name"].label));
            const toFilterArtist = _.deburr(_.toLower(el["im:artist"].label));

            return (
              toFilterAlbum.includes(filter) || toFilterArtist.includes(filter)
            );
          }),
        };
      }
      return {
        ...state,
        filteredArray: state.initialArray,
      };
    },
    filterByPlaylist: (state, action: { payload: string }) => {
      if (action.payload) {
        const playlist = localStorage.getItem("playlist");

        if (playlist) {
          const playlistList: Array<Playlist> = JSON.parse(playlist);
          const selectedPlaylist = playlistList.find(
            (el) => el.title === action.payload
          );

          if (selectedPlaylist) {
            return {
              ...state,
              filteredArray: state.initialArray.filter((el) =>
                selectedPlaylist.albums.includes(el.id.attributes["im:id"])
              ),
            };
          }
        }
        return state;
      }
      return { ...state, filteredArray: state.initialArray };
    },
    updateFavorites: (
      state,
      action: { payload: { id: string; favorite: boolean } }
    ) => {
      const updateInitial = filteredById(
        state.initialArray,
        action.payload.id,
        action.payload.favorite
      );
      const updateFiltered = filteredById(
        state.filteredArray,
        action.payload.id,
        action.payload.favorite
      );
      return {
        ...state,
        initialArray: updateInitial,
        filteredArray: updateFiltered,
      };
    },
    initItunes: (
      state,
      action: {
        payload: { iTunesAlbum: Array<ItunesAlbum>; favorites: Array<string> };
      }
    ) => {
      const initialArray = action.payload.iTunesAlbum.map((el) => {
        if (
          action.payload.favorites.find(
            (id) => id === el.id.attributes["im:id"]
          )
        ) {
          return { ...el, favorite: true };
        }
        return { ...el, favorite: false };
      });

      return {
        ...state,
        initialArray,
        filteredArray: initialArray,
      };
    },
  },
});

export const {
  filterByCategory,
  filterByArtistAndAlbum,
  updateFavorites,
  filterByFavorite,
  filterByPlaylist,
  initItunes,
} = iTunesAlbumSlice.actions;

export default iTunesAlbumSlice.reducer;
