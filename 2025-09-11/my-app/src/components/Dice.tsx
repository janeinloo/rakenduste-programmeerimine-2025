import { useState } from "react"
import "./Dice.css"

function Dice() {
  const [dice, setDice] = useState(0)

  function rollDice() {
    const newDice = Math.floor(Math.random() * 6) + 1
    setDice(newDice)
  }

  return (
    <>
      <div className="dice-container">
        <div className="dice-content">
          <h1>Dice value: {dice}</h1>
          <button onClick={rollDice}>Roll dice</button>
        </div>
      </div>
    </>
  )
}

export default Dice
