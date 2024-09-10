import React, { useState, useMemo, memo } from "react"
import { format, startOfDay, parseISO, isDate } from "date-fns"
import { useTheme } from "../components/ThemeContext"

// export default function Payment({
//   clothes,
//   lastPaymentDate,
//   onPayment,
//   onCancel,
// }) {

// }

const Payment = ({ clothes, lastPaymentDate, onPayment, onCancel }) => {
  const { darkMode } = useTheme()
  const [pricePerItem, setPricePerItem] = useState(7)

  const ensureDate = (date) => {
    if (isDate(date)) return date
    if (typeof date === "string") return parseISO(date)
    return new Date(date)
  }

  const clothesToPay = useMemo(() => {
    return clothes
  }, [clothes])

  const totalClothes = useMemo(() => {
    return clothesToPay.reduce((sum, item) => sum + item.count, 0)
  }, [clothesToPay])

  const totalAmount = useMemo(() => {
    return totalClothes * pricePerItem
  }, [totalClothes, pricePerItem])

  const handlePayment = () => {
    const paymentDate = new Date()
    const userConfirmed = window.confirm(
      `Payment of RS ${totalAmount.toFixed(
        2
      )} processed successfully for ${format(
        paymentDate,
        "dd-MMM-yyyy"
      )}. Do you want to proceed?`
    )

    if (userConfirmed) {
      onPayment(paymentDate)
      alert("The app will now reset.")
      // Add logic to reset the app here, if necessary
    } else {
      alert("Payment was not processed.")
    }
  }

  return (
    <div>
      <h2
        className={`text-2xl font-semibold ${
          darkMode ? "text-indigo-300" : "text-indigo-800"
        } mb-4`}
      >
        Payment
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="pricePerItem"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-1`}
          >
            Price per item:
          </label>
          <input
            id="pricePerItem"
            type="number"
            value={pricePerItem}
            onChange={(e) => setPricePerItem(parseFloat(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          />
        </div>
        <div
          className={`${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          } p-4 rounded-md`}
        >
          <p
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Total clothes:{" "}
            <span className="text-indigo-500">{totalClothes}</span>
          </p>
          <p
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Total amount:{" "}
            <span className="text-indigo-500">Rs {totalAmount.toFixed(2)}</span>
          </p>
        </div>
        {/* Update button styles for dark mode */}
        {/* ... */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Pay Now
        </button>
        <button
          onClick={onCancel}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Cancel
        </button>
      </div>
      <div className="mt-6">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-gray-300" : "text-gray-700"
          } mb-2`}
        >
          Records to pay:
        </h3>
        <ul className="space-y-2">
          {clothesToPay.map((item, index) => (
            <li
              key={index}
              className={`${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              } p-2 rounded-md flex justify-between`}
            >
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                {format(ensureDate(item.date), "dd-MMM-yyyy")}
              </span>
              <span
                className={`font-semibold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {item.count} items
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const MemoizedPayment = memo(Payment)

export default MemoizedPayment
