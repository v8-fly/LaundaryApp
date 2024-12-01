import { useState } from "react"

export default function Button(props) {
  console.log("Button Props", props)
  const [state, setState] = useState(1)

  return (
    <div
      onClick={() => {
        setState(Math.random())
      }}
    >
      STAR Button {props.children(state)} {state}
    </div>
  )
}
