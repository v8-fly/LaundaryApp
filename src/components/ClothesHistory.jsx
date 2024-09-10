import React from "react"
import { format } from "date-fns"
// import { useTheme } from "../ThemeContext"
import { useTheme } from "../components/ThemeContext"
import { FixedSizeList as List } from "react-window"

const ClothesHistory = React.memo(function ClothesHistory({
  clothes,
  onUpdate,
}) {
  const { darkMode } = useTheme()

  const Row = ({ index, style }) => {
    const item = clothes[index]
    return (
      <div
        style={style}
        className={`flex ${
          index % 2 === 0 ? (darkMode ? "bg-gray-800" : "bg-gray-50") : ""
        }`}
      >
        <div
          className={`flex-1 p-4 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {format(new Date(item.date), "dd-MMM-yyyy")}
        </div>
        <div className="flex-1 p-4">
          <input
            type="number"
            value={item.count}
            onChange={(e) => onUpdate(index, parseInt(e.target.value, 10))}
            className={`w-20 px-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2
        className={`text-2xl font-semibold ${
          darkMode ? "text-indigo-300" : "text-indigo-800"
        } mb-4`}
      >
        Clothes History
      </h2>
      {clothes.length === 0 ? (
        <p
          className={`${
            darkMode ? "text-gray-400" : "text-gray-500"
          } text-center py-4`}
        >
          No clothes added yet.
        </p>
      ) : (
        <div
          className={`border rounded-md ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div
            className={`flex ${
              darkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-gray-100 text-gray-700"
            } font-medium`}
          >
            <div className="flex-1 p-4">Date</div>
            <div className="flex-1 p-4">Count</div>
          </div>
          <List
            height={400}
            itemCount={clothes.length}
            itemSize={50}
            width="100%"
          >
            {Row}
          </List>
        </div>
      )}
    </div>
  )
})

export default ClothesHistory
