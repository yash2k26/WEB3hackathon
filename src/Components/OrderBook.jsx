import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'


const DummyOrder = (count , startingPrice , side )=>{
    const orders = []
    let total = 0

    for(let i = 0 ; i< count ; i++){
        const size =+ (Math.random()*100).toFixed(2)
        total += size
        const price = side === "sell" ? +(startingPrice + i * 0.01).toFixed(2) : (startingPrice - i * 0.01).toFixed(2)

        orders.push({price , size , total : +total.toFixed(2) })
    }
    return orders

}

const OrderBook = ({side = "sell"}) => {
    const [orders , setorders] = useState(DummyOrder(10,183.98,"sell"))

    useEffect(()=>{
        const interval = setInterval(() => {
            let total = 0

            setorders((prev)=>(
                prev.map((order)=>{
                    const newSize = +(order.size + (Math.random()-0.5)*5).toFixed(2)
                    total += Math.max(newSize, 0);
                    return { ...order, size: Math.max(newSize, 0), total: +total.toFixed(2) };
                })
            ))

        }, 200);
        return ()=>clearInterval(interval)
    })

  return (
    <div className='' >
        {side=="sell"?
            <div>
                <span className='mr-10'>Price (USD)</span>
                <span className='mr-2'>Size (SQL)</span>
                <span className='mr-2'>Total (SOL)</span>
            </div> : <div></div> }
        {
            orders.map((order)=>(
                <motion.div
                key={order.price}
                className='relative flex  items-center justify-center overflow-hidden h-6 mb-1 '
                animate={{opacity:1}}
                initial={{opacity:0}}
                transition={{duration:0.3}}>
                    <div
                    className={`absolute h-full w-full top-0 left-0 opacity-20 ${side === "sell" ? "bg-red-500" : "bg-green-500" } `}
                    style={{width: `${Math.min(order.total,300)}px`}}>
                    </div>
                    <div
                    className={`absolute h-full top-0 left-0 opacity-80 ${
                        side === "sell" ? "bg-red-700" : "bg-green-700"
                    } `}
                    style={{width: `${Math.min(order.size,300)}px`}}>
                    </div>
                    <div className="relative flex w-full justify-between text-sm  z-10 px-2">
                        <span className={side === "sell" ? "text-red-600" : "text-green-600"}>
                            {order.price}
                        </span>
                        <span>{order.size}</span>
                        <span>{order.total}</span>
                    </div>
                </motion.div>
            ))
        }
    </div>
  )
}

export default OrderBook
