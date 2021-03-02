/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

import CreatePlaylistForm from "./CreatePlaylistForm";

interface ICreatePlaylistModalProps {
  show: boolean;
  onClose: () => void;
}

const CreatePlaylistModal: React.FC<ICreatePlaylistModalProps> = ({
  show,
  onClose,
}: ICreatePlaylistModalProps) =>
  show ? (
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
            <div className="flex flex-row font-bold text-2xl items-center p-5 border-b border-solid border-gray-300 rounded-t">
              Créer une playlist
            </div>
            <div className="relative p-3 flex-auto">
              <CreatePlaylistForm onSuccess={onClose} />
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

export default CreatePlaylistModal;
