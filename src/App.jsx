import React, { useState, useEffect } from "react"
import { format } from "date-fns"
import AddClothes from "./components/AddClothes"
import ClothesHistory from "./components/ClothesHistory"
import Payment from "./components/Payment"

export default function App() {
  const [clothes, setClothes] = useState([])
  const [lastPaymentDate, setLastPaymentDate] = useState(null)
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    const storedClothes = localStorage.getItem("clothes")
    if (storedClothes) {
      setClothes(JSON.parse(storedClothes))
    }

    const storedLastPaymentDate = localStorage.getItem("lastPaymentDate")
    if (storedLastPaymentDate) {
      setLastPaymentDate(new Date(storedLastPaymentDate))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("clothes", JSON.stringify(clothes))
  }, [clothes])

  useEffect(() => {
    if (lastPaymentDate) {
      localStorage.setItem("lastPaymentDate", lastPaymentDate.toISOString())
    }
  }, [lastPaymentDate])

  const addClothes = (date, count) => {
    const newClothes = [...clothes, { date, count }]
    newClothes.sort((a, b) => new Date(b.date) - new Date(a.date))
    setClothes(newClothes)
  }

  const updateClothes = (index, newCount) => {
    const updatedClothes = [...clothes]
    updatedClothes[index].count = newCount
    setClothes(updatedClothes)
  }

  const handlePayment = () => {
    const newPaymentDate = new Date()
    setLastPaymentDate(newPaymentDate)
    // Clear clothes history
    setClothes([])
    setShowPayment(false)
    // Reset persisted data
    localStorage.setItem("lastPaymentDate", newPaymentDate.toISOString())
    localStorage.removeItem("clothes")
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Laundry Tracker</h1>
      <AddClothes onAdd={addClothes} />
      <ClothesHistory clothes={clothes} onUpdate={updateClothes} />
      {!showPayment && (
        <button
          onClick={() => setShowPayment(true)}
          className="bg-green-500 text-white p-2 rounded w-full mb-4"
        >
          Show Payment
        </button>
      )}
      {showPayment && (
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
