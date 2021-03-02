/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlus,
  faHeart as fasHeart,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faListAlt } from "@fortawesome/free-regular-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";

import CreatePlaylistModal from "./CreatePlaylistModal";
import DropdownPlaylist from "./DropdownPlaylist";
import SideItem from "./SideItem";

import {
  filterByArtistAndAlbum,
  filterByFavorite,
  filterByPlaylist,
} from "../stateManager/slices/iTunesAlbum.reducer";

import { useAppDispatch } from "../hooks/reduxTyped";

const Sidebar: React.FC = () => {
  const [favoriteFilter, setFavoriteFilter] = useState(false);
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col w-14 lg:w-80 xl:w-full xl:max-w-xs p-2 lg:p-4 bg-white">
      <h1
        onClick={() => dispatch(filterByPlaylist(""))}
        className="flex justify-center lg:justify-start cursor-pointer font-medium text-lg mt-1"
      >
        <FontAwesomeIcon icon={faApple} className="mr-0 lg:mr-2 text-2xl" />
        <span className="hidden lg:block">iTunes top 100</span>
      </h1>
      <hr className="my-3" />
      <ul className="flex flex-col w-full">
        <li className="hidden lg:block my-px pt-3">
          <input
            type="text"
            id="research"
            name="Rechercher"
            className="flex flex-row w-full items-center h-8 px-4 rounded-lg text-gray-600 bg-gray-100 shadow border-0"
            placeholder="Recherche ..."
            onChange={(e) => {
              dispatch(filterByArtistAndAlbum(e.currentTarget.value));
            }}
          />
        </li>
        <li className="hidden lg:block my-px">
          <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">
            Raccourcis
          </span>
        </li>
        <li className="py-2 lg:py-1 my-px cursor-pointer">
          <SideItem
            icon={faHome}
            onClick={() => dispatch(filterByArtistAndAlbum(""))}
            iconColor="gray"
            title="Accueil"
          />
        </li>
        <li className="py-2 lg:py-1 my-px cursor-pointer">
          <DropdownPlaylist
            icon={faListAlt}
            iconColor="blue"
            title="Mes playlist"
          />
        </li>
        <li className="py-2 lg:py-1 my-px cursor-pointer">
          <SideItem
            icon={faPlus}
            onClick={() => {
              setShow(true);
            }}
            iconColor="green"
            title="Créer une playlist"
          />
        </li>
        <li className="py-2 lg:py-1 my-px cursor-pointer">
          <SideItem
            icon={favoriteFilter ? fasHeart : faHeart}
            onClick={() => {
              dispatch(filterByFavorite(!favoriteFilter));
              setFavoriteFilter(!favoriteFilter);
            }}
            iconColor="red"
            title="Favoris"
          />
        </li>
      </ul>
      <CreatePlaylistModal show={show} onClose={() => setShow(false)} />
    </div>
  );
};

export default Sidebar;
