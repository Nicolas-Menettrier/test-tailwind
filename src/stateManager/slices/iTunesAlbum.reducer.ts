import { createSlice } from "@reduxjs/toolkit";

import _ from "lodash";

import { ItunesAlbum, Playlist } from "../../services/itunesApi.types";

interface IInitialState {
  initialArray: Array<ItunesAlbum>;
  mainTitle: string;
  filterPlaylist: string;
  filterCategory: string;
  filterFavorite: boolean;
  filterSearch: string;
}

const homeTitle = "Top 100 des albums disponible sur iTunes";
const favoriteTitle = "Favoris";

const initialState: IInitialState = {
  initialArray: [],
  mainTitle: "Top 100 des albums disponible sur iTunes",
  filterPlaylist: "",
  filterCategory: "",
  filterSearch: "",
  filterFavorite: false,
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
    setCategory: (state, action: { payload: string }) => ({
      ...state,
      filterCategory: action.payload,
    }),
    setFavorite: (state) => ({
      ...state,
      mainTitle: favoriteTitle,
      filterFavorite: true,
      filterPlaylist: "",
    }),
    setFilterSearch: (state, action: { payload: string }) => ({
      ...state,
      filterSearch: action.payload,
      filteredArray: state.initialArray,
    }),
    setPlaylist: (state, action: { payload: string }) => ({
      ...state,
      mainTitle: action.payload,
      filterFavorite: false,
      filterPlaylist: action.payload,
    }),
    setHomePage: (state) => ({
      ...state,
      mainTitle: homeTitle,
      filterFavorite: false,
      filterPlaylist: "",
    }),
    updateFavorites: (
      state,
      action: { payload: { id: string; favorite: boolean } }
    ) => {
      const updateInitial = filteredById(
        state.initialArray,
        action.payload.id,
        action.payload.favorite
      );

      return {
        ...state,
        initialArray: updateInitial,
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
      };
    },
  },
});

export const {
  setCategory,
  setFilterSearch,
  updateFavorites,
  setFavorite,
  setPlaylist,
  setHomePage,
  initItunes,
} = iTunesAlbumSlice.actions;

const filterByArtistAndAlbum2 = (
  state: IInitialState,
  album: Array<ItunesAlbum>
): Array<ItunesAlbum> => {
  if (state.filterSearch) {
    const filterSearch = _.deburr(_.toLower(state.filterSearch));

    return album.filter((el) => {
      const toFilterAlbum = _.deburr(_.toLower(el["im:name"].label));
      const toFilterArtist = _.deburr(_.toLower(el["im:artist"].label));

      return (
        toFilterAlbum.includes(filterSearch) ||
        toFilterArtist.includes(filterSearch)
      );
    });
  }
  return album;
};

const filterByCategory2 = (
  state: IInitialState,
  album: Array<ItunesAlbum>
): Array<ItunesAlbum> => {
  if (state.filterCategory)
    return album.filter(
      (el) => el.category.attributes.label === state.filterCategory
    );
  return album;
};

const filterByFavorite2 = (state: IInitialState): Array<ItunesAlbum> => {
  if (state.filterFavorite) {
    return state.initialArray.filter((el) => el.favorite);
  }
  return state.initialArray;
};

const filterByPlaylist2 = (
  state: IInitialState,
  album: Array<ItunesAlbum>
): Array<ItunesAlbum> => {
  const playlist = localStorage.getItem("playlist");
  const playlistJson: Array<Playlist> = playlist ? JSON.parse(playlist) : [];

  if (state.filterPlaylist && !state.filterFavorite) {
    const selectedPlaylist = playlistJson.find(
      (el) => el.title === state.filterPlaylist
    );

    if (selectedPlaylist) {
      return state.initialArray.filter((el) =>
        selectedPlaylist.albums.includes(el.id.attributes["im:id"])
      );
    }
  }
  return album;
};

export const selectFilteredList = (rootState: {
  iTunes: IInitialState;
}): Array<ItunesAlbum> => {
  const state = rootState.iTunes;
  let filteredResult: Array<ItunesAlbum> = [...state.initialArray];

  filteredResult = filterByFavorite2(state);
  filteredResult = filterByPlaylist2(state, filteredResult);
  filteredResult = filterByCategory2(state, filteredResult);
  filteredResult = filterByArtistAndAlbum2(state, filteredResult);

  return filteredResult;
};

export default iTunesAlbumSlice.reducer;
