import React from "react";

import _ from "lodash";

import AlbumsList from "./AlbumsList";
import FilterPanel from "./FilterPanel";

import { ItunesAlbum } from "../services/itunesApi.types";
import { useAppSelector } from "../hooks/reduxTyped";

interface IMainScreenProps {
  title: string;
}

const MainScreen: React.FC<IMainScreenProps> = ({
  title,
}: IMainScreenProps) => {
  const albumListInitial = useAppSelector((state) => state.iTunes.initialArray);

  const filterCategory = (acc: string[], el: ItunesAlbum): string[] => {
    if (acc.find((genre) => genre === el.category.attributes.label)) {
      return acc;
    }
    return [...acc, el.category.attributes.label];
  };

  return (
    <div className="container flex flex-col p-8 pb-0 h-screen w-full max-w-full">
      <h1 className="font-bold text-xl sm:text-xl md:text-3xl lg:text-5xl pb-8">
        {title}
      </h1>
      <FilterPanel
        listGenre={_.sortBy(albumListInitial.reduce(filterCategory, []))}
      />
      <AlbumsList />
    </div>
  );
};

export default MainScreen;
