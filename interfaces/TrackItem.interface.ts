import Track from "./Track.interface";

export default interface TrackItem {
  // added_at: string;
  // added_by: object;
  // is_local: boolean;
  // primary_color: null;
  track: Track;
  // video_thumbnail: object;
  [index: string]: any;

}