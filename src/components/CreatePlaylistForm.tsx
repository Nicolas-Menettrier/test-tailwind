import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import useLocalStorage from "../hooks/useLocalStorage";

import { Playlist } from "../services/itunesApi.types";

type Inputs = {
  title: string;
  imageUrl: string;
};

interface ICreatePlaylistModalProps {
  onSuccess: () => void;
}

const CreatePlaylistForm: React.FC<ICreatePlaylistModalProps> = ({
  onSuccess,
}: ICreatePlaylistModalProps) => {
  const [playlist, setPlaylist] = useLocalStorage<Array<Playlist>>("playlist");
  const { register, handleSubmit, errors } = useForm<Inputs>();

  useEffect(() => {
    if (errors.imageUrl) {
      toast.error("Vous devez rentrer une URL pour l'image de votre playlist.");
    }
    if (errors.title) {
      toast.error("Vous devez donner un titre à votre playlist.");
    }
  }, [errors]);

  const onSubmit = (data: Inputs) => {
    if (!playlist.find((el) => el.title === data.title)) {
      setPlaylist(
        JSON.stringify([
          ...playlist,
          {
            title: data.title,
            imageUrl: data.imageUrl,
            albums: [],
          },
        ])
      );
      toast.success(`Playlist ${data.title} bien créée.`);
      onSuccess();
    } else {
      toast.error(`Une playlist au nom de ${data.title} a déjà été créée.`);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">
        Titre de la playlist
        <div className="flex w-full items-center content-center mt-2 gap-2">
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="title"
            id="title"
            type="text"
            ref={register({ required: true })}
          />
        </div>
      </label>

      <label htmlFor="imageUrl">
        Url de l&apos;image de la playlist
        <div className="flex w-full items-center content-center mt-2 gap-2">
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="imageUrl"
            id="imageUrl"
            type="text"
            ref={register({ required: true })}
          />
        </div>
      </label>

      <input
        className="rounded-md bg-green-500 text-white p-1 hover:bg-green-600 cursor-pointer mt-4"
        type="submit"
      />
    </form>
  );
};

export default CreatePlaylistForm;
