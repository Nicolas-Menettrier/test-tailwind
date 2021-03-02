import React from "react";

import { useAppDispatch } from "../hooks/reduxTyped";

import {
  filterByArtistAndAlbum,
  filterByCategory,
} from "../stateManager/slices/iTunesAlbum.reducer";

interface IFilterPanelProps {
  listGenre: Array<string>;
}

const FilterPanel: React.FC<IFilterPanelProps> = ({
  listGenre,
}: IFilterPanelProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-row p-3 items-end space-x-3">
      <label htmlFor="category-select">
        Filtrer par genre
        <select
          className="block shadow-md h-9 rounded-md bg-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          name="category"
          id="category-select"
          onChange={(e) => dispatch(filterByCategory(e.target.value))}
        >
          <option value="">Tout</option>
          {listGenre.map((el, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <option key={index} value={el}>
              {el}
            </option>
          ))}
        </select>
      </label>
      <label className="lg:hidden" htmlFor="research">
        Recherche par artiste/album
        <input
          type="text"
          id="research"
          name="Rechercher"
          className="block w-full  px-4 h-9 rounded-md text-black bg-white shadow-md border-0 text-sm focus:ring-gray-500"
          placeholder="Recherche ..."
          onChange={(e) => {
            dispatch(filterByArtistAndAlbum(e.currentTarget.value));
          }}
        />
      </label>
    </div>
  );
};

export default FilterPanel;
