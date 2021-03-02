import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { useAppSelector } from "../hooks/reduxTyped";
import useLocalStorage from "../hooks/useLocalStorage";

import AlbumNode from "./AlbumNode";

const AlbumsList: React.FC = () => {
  const albumList = useAppSelector((state) => state.iTunes.filteredArray);
  const [favorites, setFavorites] = useLocalStorage<Array<string>>("favorites");

  return (
    <ul className="flex-grow p-3 space-y-3 overflow-y-auto">
      {albumList.length === 0 && (
        <div className="flex h-full w-full justify-center items-center">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-red-500 mr-2"
          />
          <p>Il n&apos;y a pas d&apos;album a afficher dans cette catégorie</p>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-red-500 ml-2"
          />
        </div>
      )}
      {albumList.map((el, index) => (
        <AlbumNode
          key={el.id.label}
          favorites={favorites}
          setFavorites={setFavorites}
          albumInfo={el}
          rank={index + 1}
        />
      ))}
    </ul>
  );
};

export default AlbumsList;
