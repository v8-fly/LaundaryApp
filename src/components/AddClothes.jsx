import React, { useState } from "react"
import { format, parse } from "date-fns"

export default function AddClothes({ onAdd }) {
  const [date, setDate] = useState(format(new Date(), "dd-MMM-yyyy"))
  const [count, setCount] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (count) {
      const parsedDate = parse(date, "dd-MMM-yyyy", new Date())
      onAdd(parsedDate, parseInt(count, 10))
      setCount("")
    }
  }

  const handleDateChange = (e) => {
    const inputDate = e.target.value
    const parsedDate = parse(inputDate, "yyyy-MM-dd", new Date())
    setDate(format(parsedDate, "dd-MMM-yyyy"))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
        Add Clothes
      </h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="flex-1 mb-4 sm:mb-0">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            value={format(parse(date, "dd-MMM-yyyy", new Date()), "yyyy-MM-dd")}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="count"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Number of clothes
          </label>
          <input
            id="count"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="Enter count"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Add Clothes
      </button>
    </form>
  )
}
