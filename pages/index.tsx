import Center from '../components/Center'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    /* overflow hidden allows you to not scroll the general page but have some inner components whou might overfloe scroll */
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex" >
        <Sidebar />
        <Center />
      </main>
      
      <div>
      {/* player */}
      </div>
    </div>
  )
}
