/* eslint-disable no-nested-ternary */
import React from "react";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ISideItemIcon {
  icon: IconDefinition;
  iconColor: string;
  pictureUrl?: string;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

interface ISideItemImg {
  icon?: IconDefinition;
  iconColor?: string;
  pictureUrl: string;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

type SideItemProps = {
  deleteButton?: boolean;
  onDelete?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
} & (ISideItemIcon | ISideItemImg);

const SideItem: React.FC<SideItemProps> = ({
  icon,
  iconColor,
  title,
  onClick,
  pictureUrl,
  deleteButton,
  onDelete,
}: SideItemProps) => (
  <>
    <a
      {...(onClick ? { onClick } : {})}
      className="has-tooltip transition duration-500 ease-in-out flex flex-row lg:justify-start h-8 lg:h-10 lg:px-4 rounded-lg text-gray-600 hover:bg-gray-100"
    >
      {pictureUrl ? (
        <img
          src={pictureUrl}
          alt="playlist cover"
          className="mr-auto ml-auto lg:m-0 w-8 h-8 self-center rounded-md"
        />
      ) : icon ? (
        <FontAwesomeIcon
          className={`mr-auto ml-auto lg:m-0 self-center justify-self-center text-lg text-${iconColor}-400`}
          icon={icon}
        />
      ) : (
        <></>
      )}
      <span className="tooltip -mt-7 ml-5 lg:hidden">{title}</span>

      <span className="hidden lg:block self-center ml-3">{title}</span>

      {deleteButton && (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={onDelete}
          className="hidden lg:block ml-auto self-center justify-self-center text-lg text-blue-400"
        />
      )}
    </a>
  </>
);

export default SideItem;
