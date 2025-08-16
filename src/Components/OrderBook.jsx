import { motion } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'

const generateDummyOrders = (count, midPrice, side, tick = 0.1) => {
    const orders = []
    let runningTotal = 0

    for (let index = 1; index <= count; index++) {
        const rawSize = +(Math.random() * 80000 + 200).toFixed(2)
        runningTotal += rawSize
        const price = side === 'sell'
            ? +(midPrice + index * tick).toFixed(2)
            : +(midPrice - index * tick).toFixed(2)

        orders.push({ price, size: rawSize, total: +runningTotal.toFixed(2) })
    }

    return orders
}

const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value)
}

const formatPriceParts = (price) => {
    const [intPart, decPart = '00'] = price.toFixed(2).split('.')
    return { intPart, decPart }
}

const OrderRow = ({ order, side, maxTotalPercent }) => {
    const widthPercent = Math.min((order.total / maxTotalPercent) * 100, 100)
    const sizePercent = Math.min((order.size / maxTotalPercent) * 100, 100)

    const isSell = side === 'sell'
    const priceColor = isSell ? 'text-red-500' : 'text-green-500'
    const totalBg = isSell ? 'bg-red-500/20' : 'bg-green-500/20'
    const sizeBg = isSell ? 'bg-red-600/70' : 'bg-green-600/70'

    return (
        <motion.div
            key={`${side}-${order.price}`}
            className="relative overflow-hidden h-7 mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
        >
            <div
                className={`absolute top-0 h-full ${isSell ? 'right-0' : 'left-0'} ${totalBg}`}
                style={{ width: `${widthPercent}%` }}
            />
            <div
                className={`absolute top-0 h-full ${isSell ? 'right-0' : 'left-0'} ${sizeBg}`}
                style={{ width: `${sizePercent}%` }}
            />

            <div className="relative z-10 grid grid-cols-[1fr_1fr_1fr] gap-2 text-xs px-2">
                <span className={`${priceColor}`}>{order.price.toFixed(2)}</span>
                <span className="text-slate-200 tabular-nums justify-self-end">{formatNumber(order.size)}</span>
                <span className="text-slate-300 tabular-nums justify-self-end">{formatNumber(order.total)}</span>
            </div>
        </motion.div>
    )
}

const OrderBook = () => {
    const [midPrice, setMidPrice] = useState(186.11)
    const [sellOrders, setSellOrders] = useState(() => generateDummyOrders(10, 186.11, 'sell'))
    const [buyOrders, setBuyOrders] = useState(() => generateDummyOrders(10, 186.11, 'buy'))

    useEffect(() => {
        const interval = setInterval(() => {
            setMidPrice(prev => +(prev + (Math.random() - 0.5) * 0.06).toFixed(2))

            setSellOrders(prev => {
                let running = 0
                return prev.map(o => {
                    const newSize = Math.max(0, +(o.size + (Math.random() - 0.5) * 8000).toFixed(2))
                    running += newSize
                    return { ...o, size: newSize, total: +running.toFixed(2) }
                })
            })

            setBuyOrders(prev => {
                let running = 0
                return prev.map(o => {
                    const newSize = Math.max(0, +(o.size + (Math.random() - 0.5) * 8000).toFixed(2))
                    running += newSize
                    return { ...o, size: newSize, total: +running.toFixed(2) }
                })
            })
        }, 350)

        return () => clearInterval(interval)
    }, [])

    const { sellMaxTotal, buyMaxTotal } = useMemo(() => {
        const sellMaxTotal = Math.max(...sellOrders.map(o => o.total), 1)
        const buyMaxTotal = Math.max(...buyOrders.map(o => o.total), 1)
        return { sellMaxTotal, buyMaxTotal }
    }, [sellOrders, buyOrders])

    const { intPart, decPart } = formatPriceParts(midPrice)

    return (
        <div className="w-full max-w-[420px] text-white">
            <div className="flex items-center justify-between px-2 mb-2">
                <div className="flex items-center gap-4">
                    <button className="text-sm font-medium text-white">Book</button>
                    <button className="text-sm text-slate-400">Trades</button>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <div className="rounded bg-slate-800 px-2 py-1">0.1</div>
                    <button className="rounded bg-slate-800/80 px-2 py-1">+</button>
                </div>
            </div>

            <div className="grid grid-cols-[1fr_1fr_1fr] gap-2 px-2 text-[11px] text-slate-400 mb-1">
                <span>Price (USD)</span>
                <span className="justify-self-end">Size (USD)</span>
                <span className="justify-self-end">Total (USD)</span>
            </div>

            <div className="mb-1">
                {sellOrders.map(order => (
                    <OrderRow key={`ask-${order.price}`} order={order} side="sell" maxTotalPercent={sellMaxTotal} />
                ))}
            </div>

            <div className="flex items-baseline justify-center my-1 select-none">
                <span className="text-red-500 text-xl font-semibold leading-none">{intPart}</span>
                <span className="text-red-500/90 text-base font-medium leading-none">.{decPart}</span>
            </div>

            <div>
                {buyOrders.map(order => (
                    <OrderRow key={`bid-${order.price}`} order={order} side="buy" maxTotalPercent={buyMaxTotal} />
                ))}
            </div>
        </div>
    )
}

export default OrderBook
