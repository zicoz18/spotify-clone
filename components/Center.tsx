import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Playlist from "../interfaces/Playlist.interface";
import Songs from "./Songs";

function Center() {
  const { data: session } = useSession();
  const [color, setColor]  = useState<string>("");
  const spotifyApi = useSpotify();
  /* 
    If you want to make sure you can only read th's global value you can do 
      const playlistId = useRecoilValue(playlistIdState);
    instead of 
      const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  */
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState<Playlist>(playlistState);
  console.log(playlist)

  const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-purple-500",
  ];

  useEffect(() => {
    setColor(shuffle(colors)?.pop() as string);
  }, [playlistId])

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body as any);
    }).catch(err => console.log("Something went wrong!", err));
  }, [spotifyApi, playlistId])


  return (
    /* 
      To make this scrollable in the y axis => 
      h-screen overflow-y-scroll scrollbar-hide
    */
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide ">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity:80 cursor-pointer rounded-full p-1 pr-2 text-white"
          onClick={() => signOut()}
        >
          <img className="rounded-full w-10 h-10" src={session?.user?.image as string} alt="nope" />
          <h2>{session?.user?.name as string}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
        <img  className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt="" />
        <div>
          <p>PLAYLIST</p>
          {/* 
            text-2xl md:text-3xl xl:text-5xl
            how this works is as follow;
            you start with mobile first, text-2xl indicates that text for mobile
            when you get medium device it turns to text-3xl when bigger device text-5xl
          */}
          <h1 className="text-2xl md:text-3xl xl:text-5xl" >{playlist?.name}</h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;