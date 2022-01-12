import { getSession } from 'next-auth/react';
import Center from '../components/Center';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    /* overflow hidden allows you to not scroll the general page but have some inner components whou might overfloe scroll */
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex" >
        <Sidebar />
        <Center />
      </main>
      
      <div className='sticky bottom-0' >
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  };
}
