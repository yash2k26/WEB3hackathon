import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './Components/Button'
import OrderBook from './Components/OrderBook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div className='h-screen bg-[radial-gradient(100%_100%_at_50%_0%,#020617_50%,#534ab9)]  '>

      </div> */}

      <div className='p-6 bg-slate-900 text-white min-h-screen'>
        <div className='max-w-[420px] mx-auto'>
          <OrderBook />
        </div>
      </div>
      
    </>
  )
}

export default App
