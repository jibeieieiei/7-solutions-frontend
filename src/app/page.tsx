'use client'
import Card from '@/components/Card'
import { DATA } from '@/constants/data'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type DataType = { type: 'Fruit' | 'Vegetable'; name: string }

export default function Home() {
  const [data, setData] = useState(DATA)
  const [fruits, setFruits] = useState<string[]>([])
  const [vegetables, setVegetables] = useState<string[]>([])
  const [timeoutMap, setTimeoutMap] = useState<Map<string, number>>(new Map())

  const router = useRouter()

  const handleMoveBack = ({ type, name }: DataType) => {
    setData((prevData) => {
      const isFound = prevData.find(
        (item) => item.name === name && item.type === type
      )
      if (isFound) {
        return prevData
      }
      return [...prevData, { type: type, name: name }]
    })
  }

  const handleMoveToColumn = ({ type, name }: DataType) => {
    if (type === 'Fruit') {
      setFruits([...fruits, name])
      const timeoutId = window.setTimeout(() => {
        setFruits((prev) => prev.filter((item) => item !== name))
        handleMoveBack({ type, name })
        setTimeoutMap((prev) => {
          const newMap = new Map(prev)
          newMap.delete(name)
          return newMap
        })
      }, 5000)
      setTimeoutMap((prev) => new Map(prev).set(name, timeoutId))
    } else {
      setVegetables([...vegetables, name])
      const timeoutId = window.setTimeout(() => {
        setVegetables((prev) => prev.filter((item) => item !== name))
        handleMoveBack({ type, name })
        setTimeoutMap((prev) => {
          const newMap = new Map(prev)
          newMap.delete(name)
          return newMap
        })
      }, 5000)
      setTimeoutMap((prev) => new Map(prev).set(name, timeoutId))
    }
    setData(data.filter((item) => item.name !== name || item.type !== type))
  }

  const handleMoveToList = ({ type, name }: DataType) => {
    const existingTimeoutId = timeoutMap.get(name)
    if (existingTimeoutId) {
      clearTimeout(existingTimeoutId)
      setTimeoutMap((prev) => {
        const newMap = new Map(prev)
        newMap.delete(name)
        return newMap
      })
    }

    if (type === 'Fruit') {
      setFruits(fruits.filter((fruit) => fruit !== name))
    } else {
      setVegetables(vegetables.filter((vegetable) => vegetable !== name))
    }
    setData([...data, { type: type, name: name }])
  }

  return (
    <div className="w-full h-screen flex gap-4 *:max-w-[200px] *:w-full justify-center p-4 overflow-auto relative">
      {/* Card */}
      <button
        className="absolute left-4 bottom-4 scale-50 hover:scale-100 cursor-pointer"
        onClick={() => {
          router.push('https://github.com/jibeieieiei/7-solutions-frontend')
        }}
      >
        <Image
          src="/github.jpeg"
          alt="github"
          width={100}
          height={100}
          className=""
        />
      </button>

      <div className="flex flex-col w-full max-w-40 gap-4 overflow-auto">
        {data.map((item) => (
          <Card
            key={item.name}
            name={item.name}
            onClick={() => {
              handleMoveToColumn(item)
            }}
          />
        ))}
      </div>
      {/* Fruit Col */}
      <div className="flex flex-col border border-gray-300">
        <div className="text-center p-2 bg-gray-200 border-b border-gray-300 font-bold">
          Fruit
        </div>
        <div className="w-full flex flex-col gap-4 p-4">
          {fruits.map((fruit) => (
            <Card
              key={fruit}
              name={fruit}
              onClick={() => {
                handleMoveToList({ type: 'Fruit', name: fruit })
              }}
            />
          ))}
        </div>
      </div>
      {/* Vegetable Col */}
      <div className="flex flex-col border border-gray-300">
        <div className="text-center p-2 bg-gray-200 border-b border-gray-300 font-bold">
          Vegetable
        </div>
        <div className="w-full flex flex-col gap-4 p-4">
          {vegetables.map((vegetable) => (
            <Card
              key={vegetable}
              name={vegetable}
              onClick={() => {
                handleMoveToList({ type: 'Vegetable', name: vegetable })
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
