import { ISODateString } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import SessionUser from "../interfaces/SessionUser.interface";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
});

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // If refresh access token attempt fails, direct user to login...
      if (session.error == "RefreshAccessTokenError") {
        signIn();
      } 
      spotifyApi.setAccessToken((session?.user as SessionUser).accessToken as string);
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;


