import { useState } from "react"
import { format } from "date-fns"

export default function AddClothes({ onAdd }) {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [count, setCount] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (count) {
      onAdd(date, parseInt(count, 10))
      setCount("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col space-y-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="Number of clothes"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Clothes
        </button>
      </div>
    </form>
  )
}
