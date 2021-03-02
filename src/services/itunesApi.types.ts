type Attributes = {
  term: string;
  label: string;
};

export type Playlist = {
  title: string;
  imageUrl: string;
  albums: Array<string>;
};

export type ItunesAlbum = {
  favorite?: boolean;
  "im:name": {
    label: string;
  };
  "im:image": Array<{
    label: string;
    attributes: {
      height: number;
    };
  }>;
  "im:itemCount": {
    label: string;
  };
  "im:price": {
    label: string;
  };
  "im:contentType": {
    "im:contentType": {
      attributes: Attributes;
    };
    attributes: Attributes;
  };
  rights: {
    label: string;
  };
  title: {
    label: string;
  };
  id: {
    label: string;
    attributes: {
      "im:id": string;
    };
  };
  "im:artist": {
    label: string;
    attributes: {
      href: string;
    };
  };
  category: {
    attributes: {
      "im:id": string;
      term: string;
      scheme: string;
      label: string;
    };
  };
  "im:releaseDate": {
    label: string;
    attributes: {
      label: string;
    };
  };
};
