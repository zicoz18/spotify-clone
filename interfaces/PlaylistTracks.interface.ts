import TrackItem from "./TrackItem.interface";

export default interface PlaylistTracks {
  href: string | null;
  items: TrackItem[];
  limit: number | null;
  next: null;
  offset: number | null;
  previous: null;
  total: number | null;
}