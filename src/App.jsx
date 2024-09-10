import React, { useState, useMemo, Suspense, lazy } from "react"
import { ThemeProvider, useTheme } from "./components/ThemeContext"
import { useLocalStorage } from "./components/useLocalStorage"
import AddClothes from "./components/AddClothes"
import ClothesHistory from "./components/ClothesHistory"
import { Moon, Sun } from "lucide-react"
// import ErrorBoundary from "./ErrorBoundary"

const Payment = lazy(() => import("./components/Payment"))

function AppContent() {
  const { darkMode, toggleDarkMode } = useTheme()
  const [clothes, setClothes] = useLocalStorage("clothes", [])
  const [showPayment, setShowPayment] = useState(false)

  const memoizedClothes = useMemo(() => clothes, [clothes])

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

  const handlePayment = () => {
    setClothes([])
    setShowPayment(false)
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
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        {/* <ErrorBoundary> */}
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-xl p-6 mb-8`}
        >
          <AddClothes onAdd={addClothes} />
        </div>
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-xl p-6 mb-8`}
        >
          <ClothesHistory clothes={memoizedClothes} onUpdate={updateClothes} />
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
            <Suspense fallback={<div>Loading payment...</div>}>
              <Payment
                clothes={memoizedClothes}
                onPayment={handlePayment}
                onCancel={() => setShowPayment(false)}
              />
            </Suspense>
          </div>
        )}
        {/* </ErrorBoundary> */}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
