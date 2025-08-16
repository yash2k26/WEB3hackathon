import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"

const DummyOrder = (count, startingPrice, side) => {
  const orders = []
  let total = 0

  for (let i = 0 ; i < count; i++) {
    const size = +(Math.random() * 100).toFixed(2)
    total += size
    const price =
      side === "sell"
        ? +(startingPrice + i * 0.01).toFixed(2)
        : +(startingPrice - i * 0.01).toFixed(2)

    orders.push({ price, size, total: +total.toFixed(2) })
  }
  return orders
}

const formatNumber = (num) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)


const OrderBook = () => {
  const [sellOrders, setSellOrders] = useState(DummyOrder(7, 273.98, "sell"))
  const [buyOrders, setBuyOrders] = useState(DummyOrder(7, 296.97, "buy"))
  const [currentPrice] = useState(183.98)
  

  useEffect(() => {
    const interval = setInterval(() => {
      setSellOrders((prev) => {
        let total = 0
        return prev.map((order) => {
          const newSize = +(order.size + (Math.random() - 0.5) * 5).toFixed(2)
          total += Math.max(newSize, 0)
          return {
            ...order,
            size: Math.max(newSize, 0),
            total: +total.toFixed(2),
          }
        })
      },)

      setBuyOrders((prev) => {
        let total = 0
        return prev.map((order) => {
          const newSize = +(order.size + (Math.random() - 0.5) * 5).toFixed(2)
          total += Math.max(newSize, 0)
          return {
            ...order,
            size: Math.max(newSize, 0),
            total: +total.toFixed(2),
          }
        })
      })
    }, 450)
    return () => clearInterval(interval)
  })

  const maxSellTotal = Math.max(...sellOrders.map((o) => o.total))
  const maxBuyTotal = Math.max(...buyOrders.map((o) => o.total))

  const OrderRow = ({ order, side, maxTotal }) => (
    <motion.div
      key={order.price}
      className={`relative rounded-xs group flex items-center justify-center overflow-hidden h-14 mb-1 `}
      layout
      transition={{ duration: 0.1  }}
    >

      
      <motion.div
        className={`absolute h-full rounded-xs top-0 right-0 opacity-20 ${
          side === "sell" ? "bg-red-400" : "bg-green-400"
        }`}
        style={{ 
            width: `${(order.total / maxTotal) * 100}%` ,
        transition : "width 0.4s ease-in-out "}}
      />
      
      <motion.div
        className={`absolute h-full rounded-xs top-0 right-0 opacity-80 ${
          side === "sell" ? "bg-red-500/50" : "bg-green-500/50"
        }`}
        style={{ 
            width: `${(order.size / maxTotal) * 100}%` ,
            transition : "width 0.4s ease-in-out "}}
      />

      
      <div className="relative flex w-full justify-between text-sm z-10 px-2 font-mono">
        <span className={side === "sell" ? "text-red-600" : "text-green-600"}>
          {formatNumber(order.price)}
        </span>
        <span>{formatNumber(order.size)}</span>
        <span>{formatNumber(order.total)}</span>
      </div>

    </motion.div>
  )

  return (
    <div className="bg-gray-900 text-white  w-80 h-96 flex flex-col">
      <div className="flex justify-between relative px-2 py-2 text-xs text-gray-400 border-b border-gray-700">
        <span>Price (USD)</span>
        <span>Size</span>
        <span>Total</span>
      </div>

    

      <div className="flex-1 flex flex-col-reverse overflow-hidden p-1">
        {sellOrders.map((order) => (
          <OrderRow
            key={`sell-${order.price}`}
            order={order}
            side="sell"
            maxTotal={maxSellTotal}
          />
        ))}
      </div>

    
      <div className="flex items-center justify-center py-2 border-y border-gray-700">
        <span className="text-green-400 font-mono text-sm font-bold">
          {formatNumber(currentPrice)}
        </span>
      </div>

    
      <div className="flex-1 flex flex-col overflow-hidden p-1">
        {buyOrders.map((order) => (
          <OrderRow
            key={`buy-${order.price}`}
            order={order}
            side="buy"
            maxTotal={maxBuyTotal}
          />
        ))}
      </div>
    </div>
   
  )
}

export default OrderBook
