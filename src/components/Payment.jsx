import React, { useState, useMemo } from "react"
import { format, startOfDay, parseISO, isDate } from "date-fns"

export default function Payment({
  clothes,
  lastPaymentDate,
  onPayment,
  onCancel,
}) {
  const [pricePerItem, setPricePerItem] = useState(7)

  const ensureDate = (date) => {
    if (isDate(date)) return date
    if (typeof date === "string") return parseISO(date)
    return new Date(date)
  }

  const clothesToPay = useMemo(() => {
    // if (!lastPaymentDate) return clothes
    // const paymentDay = startOfDay(ensureDate(lastPaymentDate))
    // return clothes.filter((item) => {
    //   const itemDate = ensureDate(item.date)
    //   return startOfDay(itemDate) > paymentDay
    // })
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
      <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Payment</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="pricePerItem"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price per item:
          </label>
          <input
            id="pricePerItem"
            type="number"
            value={pricePerItem}
            onChange={(e) => setPricePerItem(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-lg font-semibold">
            Total clothes:{" "}
            <span className="text-indigo-600">{totalClothes}</span>
          </p>
          <p className="text-lg font-semibold">
            Total amount:{" "}
            <span className="text-indigo-600">Rs {totalAmount.toFixed(2)}</span>
          </p>
        </div>
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
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Records to pay:
        </h3>
        <ul className="space-y-2">
          {clothesToPay.map((item, index) => (
            <li
              key={index}
              className="bg-gray-50 p-2 rounded-md flex justify-between"
            >
              <span>{format(ensureDate(item.date), "dd-MMM-yyyy")}</span>
              <span className="font-semibold">{item.count} items</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
