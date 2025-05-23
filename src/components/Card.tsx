import { CardType } from '@/types/components/Card'

const Card = ({ name, onClick }: CardType) => {
  return (
    <button
      className="w-full hover:bg-gray-200 border border-gray-300 text-center cursor-pointer max-w-full"
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default Card
