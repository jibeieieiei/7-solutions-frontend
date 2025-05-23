'use client'
import Card from '@/components/Card'
import { DATA } from '@/constants/data'
import { useState } from 'react'

type DataType = { type: 'Fruit' | 'Vegetable'; name: string }

export default function Home() {
  const [data, setData] = useState(DATA)
  const [fruits, setFruits] = useState<string[]>([])
  const [vegetables, setVegetables] = useState<string[]>([])

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
      setTimeout(() => {
        setFruits((prevFruits) => {
          return prevFruits.filter((item) => item !== name)
        })
        handleMoveBack({ type, name })
      }, 5000)
    } else {
      setVegetables([...vegetables, name])
      setTimeout(() => {
        setVegetables((prevVegetables) => {
          return prevVegetables.filter((item) => item !== name)
        })
        handleMoveBack({ type, name })
      }, 5000)
    }
    setData(data.filter((item) => item.name !== name || item.type !== type))
  }

  const handleMoveToList = ({ type, name }: DataType) => {
    if (type === 'Fruit') {
      setFruits(fruits.filter((fruit) => fruit !== name))
    } else {
      setVegetables(vegetables.filter((vegetable) => vegetable !== name))
    }
    setData([...data, { type: type, name: name }])
  }

  return (
    <div className="w-full h-screen flex gap-4 *:max-w-[200px] *:w-full justify-center p-4 overflow-auto">
      {/* Card */}
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
