import React, { useEffect } from "react";

import _ from "lodash";

import AlbumsList from "./AlbumsList";
import FilterPanel from "./FilterPanel";

import useFetch from "../hooks/useFetch";
import { useAppDispatch } from "../hooks/reduxTyped";

import { ItunesAlbum } from "../services/itunesApi.types";
import { getTopAlbumList } from "../services/itunesApi";

import { initItunes } from "../stateManager/slices/iTunesAlbum.reducer";
import useLocalStorage from "../hooks/useLocalStorage";

interface IMainScreenProps {
  title: string;
}

const MainScreen: React.FC<IMainScreenProps> = ({
  title,
}: IMainScreenProps) => {
  const dispatch = useAppDispatch();
  const [favorites] = useLocalStorage<Array<string>>("favorites");
  const { data: albumList } = useFetch<Array<ItunesAlbum>>([], () =>
    getTopAlbumList()
  );

  const filterCategory = (acc: string[], el: ItunesAlbum): string[] => {
    if (acc.find((genre) => genre === el.category.attributes.label)) {
      return acc;
    }
    return [...acc, el.category.attributes.label];
  };

  useEffect(() => {
    if (albumList.length > 0) {
      dispatch(
        initItunes({
          iTunesAlbum: albumList,
          favorites,
        })
      );
    }
  }, [albumList, dispatch, favorites]);

  return (
    <div className="container flex flex-col p-8 pb-0 h-screen w-full max-w-full">
      <h1 className="font-bold text-xl sm:text-xl md:text-3xl lg:text-5xl pb-8">
        {title}
      </h1>
      <FilterPanel listGenre={_.sortBy(albumList.reduce(filterCategory, []))} />
      <AlbumsList />
    </div>
  );
};

export default MainScreen;
