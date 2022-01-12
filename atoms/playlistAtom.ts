import { atom } from 'recoil';
import Playlist from '../interfaces/Playlist.interface';

export const playlistState = atom({
  key: "playlistState",
  default: (null as unknown as Playlist)
})

export const playlistIdState = atom({
  key: "playlistIdState",
  default: '37i9dQZF1EUMDoJuT8yJsl'
});
