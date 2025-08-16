import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OrderBook from './Components/OrderBook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div className='h-screen bg-[radial-gradient(100%_100%_at_50%_0%,#020617_60%,#534ab9)]  '>
        <img src="" alt="" />
      </div> */}

      <div className=' p-6 flex justify-center items-center bg-gray-800 shadow-white shadow-2xl  text-white min-h-screen  '>
        <div className='rounded-md overflow-auto ' >
          <OrderBook side='sell' />
        </div>
      </div>
      
    </>
  )
}

export default App
