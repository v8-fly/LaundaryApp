import { useState, useEffect } from "react"
import AddClothes from "./components/AddClothes"
import ClothesHistory from "./components/ClothesHistory"
import Payment from "./components/Payment"
import { Moon, Sun } from "lucide-react"
import Button from "./components/Button"

const TestComponent = (props) => {
  console.log("TestComponent_Render", props)
  return (
    <>
      <h1>TestComponent</h1>
    </>
  )
}

export default function App() {
  return (
    <Button label={"submit"}>
      {(props) => {
        console.log("RenderProps", props)
        return <TestComponent prop={props} />
      }}
    </Button>
  )
}
