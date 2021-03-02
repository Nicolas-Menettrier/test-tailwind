/* eslint-disable import/prefer-default-export */

// rêgle désactivée parce qu'on pourrait y rajouter des fonctions au fil du projet

import { ItunesAlbum } from "./itunesApi.types";

// ici typer limit ne sert pas parce que le type est implicite avec la valeur par défaut
export const getTopAlbumList = async (
  limit = 100
): Promise<Array<ItunesAlbum>> => {
  try {
    const response = await fetch(
      `https://itunes.apple.com/us/rss/topalbums/limit=${limit.toString()}/json`
    );

    if (response.ok) {
      const data: {
        feed: { entry: Array<ItunesAlbum> };
      } = await response.json();

      return data.feed.entry;
    }
    throw new Error("Problème lors de l'appel a l'api itunes");
  } catch (error) {
    throw new Error(error.message);
  }
};
