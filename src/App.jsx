import { useState, useEffect } from "react"
import AddClothes from "./components/AddClothes"
import ClothesHistory from "./components/ClothesHistory"
import Payment from "./components/Payment"
import { Moon, Sun } from "lucide-react"

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
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode")
    return savedMode ? JSON.parse(savedMode) : false
  })

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

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

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
    setClothes([])
    setLastPaymentDate(paymentDate)
    setShowPayment(false)
    localStorage.removeItem("clothes")
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-100 to-indigo-200"
      } py-8`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`text-4xl font-bold text-center ${
              darkMode ? "text-indigo-300" : "text-indigo-800"
            }`}
          >
            Laundry Tracker
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-xl p-6 mb-8`}
        >
          <AddClothes onAdd={addClothes} darkMode={darkMode} />
        </div>
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-xl p-6 mb-8`}
        >
          <ClothesHistory
            clothes={clothes}
            onUpdate={updateClothes}
            darkMode={darkMode}
          />
        </div>
        {!showPayment ? (
          <button
            onClick={() => setShowPayment(true)}
            className={`w-full ${
              darkMode
                ? "bg-indigo-700 hover:bg-indigo-800"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105`}
          >
            Show Payment
          </button>
        ) : (
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-xl p-6`}
          >
            <Payment
              clothes={clothes}
              lastPaymentDate={lastPaymentDate}
              onPayment={handlePayment}
              onCancel={() => setShowPayment(false)}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  )
}
