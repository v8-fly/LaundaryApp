import React from "react"
import { format } from "date-fns"

export default function ClothesHistory({ clothes, onUpdate, darkMode }) {
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
        <div className="overflow-x-auto">
          <table
            className={`min-w-full divide-y ${
              darkMode ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            <thead className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Date
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Count
                </th>
              </tr>
            </thead>
            <tbody
              className={`${darkMode ? "bg-gray-900" : "bg-white"} divide-y ${
                darkMode ? "divide-gray-700" : "divide-gray-200"
              }`}
            >
              {clothes.map((item, index) => (
                <tr key={index}>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {format(item.date, "dd-MMM-yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={item.count}
                      onChange={(e) =>
                        onUpdate(index, parseInt(e.target.value, 10))
                      }
                      className={`w-20 px-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        darkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-white text-gray-900 border-gray-300"
                      }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
