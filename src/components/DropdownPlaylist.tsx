/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toast } from "react-toastify";

import SideItem from "./SideItem";

import useLocalStorage from "../hooks/useLocalStorage";
import { useAppDispatch } from "../hooks/reduxTyped";
import { filterByPlaylist } from "../stateManager/slices/iTunesAlbum.reducer";

import { Playlist } from "../services/itunesApi.types";

interface IDropdownPlaylistProps {
  icon: IconDefinition;
  iconColor: string;
  title: string;
  dropdownList?: Array<JSX.Element>;
}

const DropdownPlaylist: React.FC<IDropdownPlaylistProps> = ({
  icon,
  iconColor,
  title,
  dropdownList,
}: IDropdownPlaylistProps) => {
  const [, setPlaylistLS] = useLocalStorage<Array<Playlist>>("playlist");
  const [playlist, setPlaylist] = useState<Array<Playlist>>([]);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const playlistString = localStorage.getItem("playlist");

    if (playlistString) {
      setPlaylist(JSON.parse(playlistString));
    }
  }, [open]);

  const deletePlaylist = (playlistTitle: string) => {
    // Le mieux aurait été un ID, mais vu que je passe par le local storage
    // je me contente du titre qui lui aussi doit être unique.
    const newPlaylist = playlist.filter((el) => el.title !== playlistTitle);

    setPlaylistLS(JSON.stringify(newPlaylist));
    setPlaylist(newPlaylist);
    toast.success("La playlist a bien été supprimé.");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onKeyDown={() => setOpen(!open)}
        tabIndex={0}
        className="has-tooltip transition duration-500 ease-in-out w-full flex flex-row lg:justify-start h-8 lg:h-10 lg:px-4 rounded-lg text-gray-600 hover:bg-gray-100"
      >
        <FontAwesomeIcon
          className={`mr-auto ml-auto lg:m-0 self-center justify-self-center text-lg text-${iconColor}-400`}
          icon={icon}
        />
        <span className="tooltip -mt-7 ml-5 lg:hidden">{title}</span>

        <span className="hidden lg:block self-center ml-3">{title}</span>
      </button>
      <div
        className={`${
          open && playlist.length > 0 ? "" : "hidden"
        } lg:pl-4 mt-2 space-y-2`}
      >
        {open ? (
          dropdownList ? (
            dropdownList.map((el) => el)
          ) : (
            playlist.map((el, index) => (
              <SideItem
                deleteButton
                onClick={() => dispatch(filterByPlaylist(el.title))}
                onDelete={() => deletePlaylist(el.title)}
                key={index}
                pictureUrl={el.imageUrl}
                title={el.title}
              />
            ))
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default DropdownPlaylist;
