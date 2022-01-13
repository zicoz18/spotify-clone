# A Spotify Clone App written with Next.js, React, Tailwind CSS, Typescript, Recoil.js 
This app is kind of remote control to your spotify. So, it does not play the songs directly, it makes your spotify play the song. Therefore, you can start a song from this app, close this app and continue listening. But you can not play a song without an already active spotify. This is not a fully functional Spotify Clone. 

## Implemented Functionalities
* Login with Spotify, with session
* Display user's playlists
* Display songs inside a user's playlist
* Play and stop songs
* Adjust song's volume

### Other presented parts such as 'Liked Songs', 'Home' are not implemented

## How to run locally
Step 1

Create an env file

In the root directory of the project create a file named: 
```sh
.env.local
```
Example Environment file:
```sh
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLIENT_SECRET={YOUR_SPOTIFY_CLIENT_SECRET}
NEXT_PUBLIC_CLIENT_ID={YOUR_SPOTIFY_CLIENT_ID}
JWT_SECRET={SECRET_VALUE_FOR_JWT}
```
Step 2
```sh
npm i
```
Step 3
```
npm run dev
```
