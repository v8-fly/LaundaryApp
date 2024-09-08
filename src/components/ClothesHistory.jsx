import React from "react"
import { format } from "date-fns"

export default function ClothesHistory({ clothes, onUpdate }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Clothes History</h2>
      <ul className="space-y-2">
        {clothes.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{format(new Date(item.date), "dd/MM/yyyy")}</span>
            <input
              type="number"
              value={item.count}
              onChange={(e) => onUpdate(index, parseInt(e.target.value, 10))}
              className="border p-1 w-16 text-right"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
