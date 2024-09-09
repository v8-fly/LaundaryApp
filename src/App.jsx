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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          Laundry Tracker
        </h1>
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <AddClothes onAdd={addClothes} />
        </div>
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <ClothesHistory clothes={clothes} onUpdate={updateClothes} />
        </div>
        {!showPayment ? (
          <button
            onClick={() => setShowPayment(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Show Payment
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <Payment
              clothes={clothes}
              lastPaymentDate={lastPaymentDate}
              onPayment={handlePayment}
              onCancel={() => setShowPayment(false)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
