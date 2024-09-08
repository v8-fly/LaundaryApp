import React, { useState, useMemo } from "react"
import { format } from "date-fns"

export default function Payment({
  clothes,
  lastPaymentDate,
  onPayment,
  onCancel,
}) {
  const [pricePerItem, setPricePerItem] = useState(1)

  const clothesToPay = useMemo(() => {
    if (!lastPaymentDate) return clothes
    return clothes.filter((item) => new Date(item.date) > lastPaymentDate)
  }, [clothes, lastPaymentDate])

  const totalClothes = useMemo(() => {
    return clothesToPay.reduce((sum, item) => sum + item.count, 0)
  }, [clothesToPay])

  const totalAmount = useMemo(() => {
    return totalClothes * pricePerItem
  }, [totalClothes, pricePerItem])

  const handlePayment = () => {
    onPayment()
    alert(`Payment of RS ${totalAmount.toFixed(2)} processed successfully!`)
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Payment</h2>
      <div className="space-y-2">
        <div>
          <label htmlFor="pricePerItem" className="block">
            Price per item:
          </label>
          <input
            id="pricePerItem"
            type="number"
            value={pricePerItem}
            onChange={(e) => setPricePerItem(parseFloat(e.target.value))}
            className="border p-1 w-full"
          />
        </div>
        <p>Total clothes: {totalClothes}</p>
        <p>Total amount: Rs {totalAmount.toFixed(2)}</p>
        <button
          onClick={handlePayment}
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Pay Now
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white p-2 rounded w-full"
        >
          Cancel
        </button>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Records to pay:</h3>
        <ul className="space-y-1">
          {clothesToPay.map((item, index) => (
            <li key={index}>
              {format(new Date(item.date), "dd/MM/yyyy")} - {item.count} items
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
