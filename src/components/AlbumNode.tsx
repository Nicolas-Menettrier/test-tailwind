import React, { useState } from "react";

import { toast } from "react-toastify";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

import AlbumActionModal from "./AlbumActionModal";

import { ItunesAlbum } from "../services/itunesApi.types";

import { updateFavorites } from "../stateManager/slices/iTunesAlbum.reducer";
import { useAppDispatch } from "../hooks/reduxTyped";

interface IAlbumNodeProps {
  albumInfo: ItunesAlbum;
  rank: number;
  favorites: Array<string>;
  setFavorites: (value: string) => void;
}

const AlbumNode: React.FC<IAlbumNodeProps> = ({
  albumInfo,
  rank,
  favorites,
  setFavorites,
}: IAlbumNodeProps) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const favoriteManagement = () => {
    if (!albumInfo.favorite) {
      setFavorites(
        JSON.stringify([...favorites, albumInfo.id.attributes["im:id"]])
      );
      toast.success(
        `L'album ${albumInfo["im:name"].label} a été ajouté au favoris.`
      );
    } else {
      setFavorites(
        JSON.stringify(
          favorites.filter((el) => el !== albumInfo.id.attributes["im:id"])
        )
      );
      toast.error(
        `L'album ${albumInfo["im:name"].label} a été retiré des favoris.`
      );
    }
    dispatch(
      updateFavorites({
        id: albumInfo.id.attributes["im:id"],
        favorite: !albumInfo.favorite,
      })
    );
  };

  return (
    <>
      <div
        className="transition duration-300 ease-in-out flex flex-col rounded-lg container bg-white p-6 shadow-md transform hover:-translate-y-1 hover:scale-102 cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={() => setShow(true)}
        onKeyDown={() => setShow(true)}
      >
        <div className="flex flex-row">
          <div className="self-center pr-5">{rank}</div>
          <img
            src={albumInfo["im:image"][1].label}
            alt="album"
            className="object-none mr-4 w-auto flex-shrink-0 max-w-none"
          />
          <div className=" flex flex-col justify-around w-auto">
            <div className="font-bold">{albumInfo["im:name"].label}</div>
            <div className="font-thin">{albumInfo["im:artist"].label}</div>
            <div className="text-gray-400 text-xs">
              {albumInfo.rights.label}
            </div>
          </div>
          <FontAwesomeIcon
            className={`transition duration-300 ease-in-out ml-auto ${
              albumInfo.favorite ? "text-red-600 hover:text-black" : ""
            } hover:text-red-600`}
            onClick={(e) => {
              e.stopPropagation();
              favoriteManagement();
            }}
            icon={albumInfo.favorite ? fasHeart : faHeart}
          />
        </div>
        <div className="mt-2 flex gap-2">
          <div className="text-xs">
            <span className="font-bold">Piste :</span>{" "}
            {albumInfo["im:itemCount"].label}&nbsp;&nbsp;&nbsp;-
          </div>
          <div className="text-xs">
            <span className="font-bold">Genre :</span>{" "}
            {albumInfo.category.attributes.label}&nbsp;&nbsp;&nbsp;-
          </div>
          <div className="text-xs">
            <span className="font-bold">Prix :</span>{" "}
            {albumInfo["im:price"].label}
          </div>
        </div>
      </div>
      {show ? (
        <AlbumActionModal
          show={show}
          onClose={() => setShow(false)}
          albumInfo={albumInfo}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default AlbumNode;
