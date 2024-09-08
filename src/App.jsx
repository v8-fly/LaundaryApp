import React, { useState, useEffect } from "react"
import AddClothes from "./components/AddClothes"
import ClothesHistory from "./components/ClothesHistory"
import Payment from "./components/Payment"

export default function App() {
  const [clothes, setClothes] = useState(() => {
    const savedClothes = localStorage.getItem("clothes")
    if (savedClothes) {
      return JSON.parse(savedClothes).map((item) => ({
        ...item,
        date: new Date(item.date),
      }))
    }
    return []
  })

  const [lastPaymentDate, setLastPaymentDate] = useState(() => {
    const savedDate = localStorage.getItem("lastPaymentDate")
    return savedDate ? new Date(savedDate) : null
  })

  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    localStorage.setItem("clothes", JSON.stringify(clothes))
  }, [clothes])

  useEffect(() => {
    if (lastPaymentDate) {
      localStorage.setItem("lastPaymentDate", lastPaymentDate.toISOString())
    } else {
      localStorage.removeItem("lastPaymentDate")
    }
  }, [lastPaymentDate])

  const addClothes = (date, count) => {
    setClothes((prevClothes) => [...prevClothes, { date, count }])
  }

  const updateClothes = (index, newCount) => {
    setClothes((prevClothes) =>
      prevClothes.map((item, i) =>
        i === index ? { ...item, count: newCount } : item
      )
    )
  }

  const handlePayment = (paymentDate) => {
    // Reset the entire app state
    setClothes([])
    setLastPaymentDate(paymentDate)
    setShowPayment(false)
    // Clear local storage
    localStorage.removeItem("clothes")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Laundry Tracker 🥳😎</h1>
      <AddClothes onAdd={addClothes} />
      <ClothesHistory clothes={clothes} onUpdate={updateClothes} />
      {!showPayment ? (
        <button
          onClick={() => setShowPayment(true)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Show Payment
        </button>
      ) : (
        <Payment
          clothes={clothes}
          lastPaymentDate={lastPaymentDate}
          onPayment={handlePayment}
          onCancel={() => setShowPayment(false)}
        />
      )}
    </div>
  )
}
