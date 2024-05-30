import { useState } from "react"
import Title from "./components/Title"
import Card from "./components/Card"
import Case from "./components/Case"

export default function App() {
  // const [name, setName] = useState('PPLG')
  return (
    <Case>
    <div className='bg-gray-900 flex items-center justify-center min-h-screen'>
        <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg max-w-lg w-full p-6">
          {/* <Title name="Dashboard" page="Home" lang="ReactJS"/>  */}
          {/* props untuk ngasih variable kedalam components baru / ngirim data */}
            <h4 className='text-white text-2xl'>Hello </h4>
            <p className='text-lg text-gray-400 leading-relaxed'>A JavaScript library for building user interfaces</p>

            {/* <Card judul = "produktif" content = "content"></Card> */}
        </div>
    </div>
    </Case>
  )
}