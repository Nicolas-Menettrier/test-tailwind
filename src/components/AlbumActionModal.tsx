/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import useLocalStorage from "../hooks/useLocalStorage";

import { ItunesAlbum, Playlist } from "../services/itunesApi.types";

interface IAlbumActionModalProps {
  show: boolean;
  onClose: () => void;
  albumInfo: ItunesAlbum;
}

type Inputs = {
  title: string;
};

const AlbumActionModal: React.FC<IAlbumActionModalProps> = ({
  show,
  onClose,
  albumInfo,
}: IAlbumActionModalProps) => {
  const [playlist, setPlaylist] = useLocalStorage<Array<Playlist>>("playlist");
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    const currentPlaylist = playlist.find((el) => el.title === data.title);

    if (currentPlaylist) {
      if (
        currentPlaylist.albums.find(
          (el) => el === albumInfo.id.attributes["im:id"]
        )
      ) {
        toast.error("L'album choisit est déjà dans cette playlist.");
      } else {
        currentPlaylist.albums.push(albumInfo.id.attributes["im:id"]);
        setPlaylist(JSON.stringify(playlist));
        toast.success(
          `L'album ${albumInfo["im:name"].label} a bien été ajouté.`
        );
        onClose();
      }
    }
  };

  return show ? (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={() => onClose()}
      >
        <div
          className="relative w-full md:w-3/6 lg:w-2/6 my-6 mx-auto max-w-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex flex-row  items-center p-5 border-b border-solid border-gray-300 rounded-t">
              <img
                src={albumInfo["im:image"][1].label}
                alt="album"
                className="object-none mr-4 w-auto flex-shrink-0 max-w-none"
              />
              <div>
                <h3 className="text-2xl font-semibold">
                  {albumInfo["im:name"].label}
                </h3>
                <h4>{albumInfo["im:artist"].label}</h4>
              </div>
            </div>
            <div className="relative p-3 flex-auto">
              <p className="my-4 text-gray-600 text-sm mt-0">
                <a href={albumInfo.id.label} className="hover:text-blue-500">
                  Lien vers la page iTunes
                </a>
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title-select" className="text-sm">
                  Ajouter a une playlist :
                  <div className="flex w-full items-center content-center mt-2 gap-2">
                    <select
                      className="block rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                      name="title"
                      id="title-select"
                      ref={register({ required: true })}
                    >
                      <option value="">--Choisissez une playlist--</option>
                      {playlist.map((el) => (
                        <option key={el.title}>{el.title}</option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="bg-green-500 rounded-lg p-2 text-white hover:bg-green-600"
                    >
                      Ajout
                    </button>
                  </div>
                </label>
              </form>
            </div>
            <div className="flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b">
              <button
                className="text-red-500 background-transparent font-semibold px-2 py-1 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => onClose()}
              >
                Quitter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="opacity-50 fixed inset-0 z-40 bg-black"
        style={{ marginTop: "unset" }}
      />
    </>
  ) : (
    <></>
  );
};

export default AlbumActionModal;
