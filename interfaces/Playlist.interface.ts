import PlaylistImage from './PlaylistImage.interface';
import PlaylistTracks from './PlaylistTrackS.interface';

export default interface Playlist {
  collabrative: boolean;
  description: string;
  external_urls: object;
  href: string;
  id: string;
  images: PlaylistImage[];
  name: string;
  owner: object;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: PlaylistTracks;
  type: string;
  uri: string;
}

