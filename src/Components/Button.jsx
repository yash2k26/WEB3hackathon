import React, { useState } from 'react'
 
 const Button = () => {

    const [pop , setpop] = useState(false)
    const popup = ()=>setpop(true)
    const closepopup = ()=>setpop(false)

    const Wallets = [
    { name: 'Phantom', img: 'src/assets/Phantom_SVG_Icon.svg' },
    { name: 'Solflare', img: 'src/assets/App-Icon.svg' },
    { name: 'Backpack', img: 'src/assets/image-removebg-preview (11).png' },
    ]
    

   return (
    <div className='h-screen bg-white flex justify-center items-center'>
        <button onClick={popup} className='font-semibold rounded-2xl hover:bg-neutral-100  bg-transparent p-3 cursor-pointer text-black shadow-2xl w-40  '>
            Connect Wallet
        </button>

        {pop && (<div className='z-10 bg-transparent backdrop-blur-md flex justify-center items-center fixed inset-0 '>
            <div className='bg-white/90 backdrop-blur-2xl h-90 w-80 shadow-2xl p-6 relative rounded-xl'>
                <h2 className='mt-4 ml-12 mb-8 bg-gradient-to-r from-purple-500  to-pink-500 bg-clip-text text-transparent text-xl font-semibold '>Choose your Wallet</h2>
                <button type="button" onClick={closepopup} class="bg-white cursor-pointer absolute right-1  top-1 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none ">
              <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div>
                {Wallets.map((wallet)=>(
                    <button
                        key={wallet.name}
                        className="flex cursor-pointer m-4 mx-auto items-center gap-3 w-full px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition"
                        >
                            <img src={wallet.img} alt="" className='size-6' />
                            <span className='text-gray-700' >{wallet.name}</span>
                    </button>
                ))}
            </div>
            </div>
        </div>) }    
     </div>
   )
 }
 
 export default Button
 