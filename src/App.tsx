import React, { useEffect } from "react";

import MainScreen from "./components/MainScreen";
import Sidebar from "./components/Sidebar";

import { useAppDispatch, useAppSelector } from "./hooks/reduxTyped";
import useLocalStorage from "./hooks/useLocalStorage";
import useFetch from "./hooks/useFetch";

import { getTopAlbumList } from "./services/itunesApi";
import { ItunesAlbum } from "./services/itunesApi.types";

import { initItunes } from "./stateManager/slices/iTunesAlbum.reducer";

const App: React.FC = () => {
  const { title, albumListRedux } = useAppSelector((state) => ({
    title: state.iTunes.mainTitle,
    albumListRedux: state.iTunes.initialArray,
  }));
  const dispatch = useAppDispatch();
  const [favorites] = useLocalStorage<Array<string>>("favorites");
  const { data: albumList } = useFetch<Array<ItunesAlbum>>([], () =>
    getTopAlbumList()
  );

  useEffect(() => {
    if (albumList.length > 0 && albumListRedux.length === 0) {
      dispatch(
        initItunes({
          iTunesAlbum: albumList,
          favorites,
        })
      );
    }
  }, [albumList, albumListRedux.length, dispatch, favorites]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <MainScreen title={title} />
    </div>
  );
};

export default App;
