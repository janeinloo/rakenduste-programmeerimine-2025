import { useState } from "react"
import "../App.css"

function Counter() {
  const [count, setCount] = useState<number>(0)

  function increaseCounter(amount: number) {
    setCount(count => count + amount)
  }

  function decreaseCounter(amount: number) {
    setCount(count => count - amount)
  }

  return (
    <>
      <h1>Counter</h1>
      <div className="card">
        <h2>Count: {count}</h2>
        <button onClick={() => increaseCounter(100)}>+100</button>
        <br />
        <button onClick={() => increaseCounter(50)}>+50</button>
        <br />
        <button onClick={() => increaseCounter(25)}>+25</button>
        <br />
        <button onClick={() => increaseCounter(1)}>1</button>
        <br />
        <br />
        <button onClick={() => decreaseCounter(1)}>-1</button>
        <br />
        <button onClick={() => decreaseCounter(25)}>-25</button>
        <br />
        <button onClick={() => decreaseCounter(50)}>-50</button>
        <br />
        <button onClick={() => decreaseCounter(100)}>-100</button>
      </div>
    </>
  )
}

export default Counter
