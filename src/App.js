import { useState } from 'react';
import './App.css';

function App() {
  const forceData = []
  const forceResultant = []
  const [num, setNum] = useState(1)
  const [force, setForce] = useState(forceData)
  const [resultant, setResultant] = useState(forceResultant)
  const add = event => {
    event.preventDefault()
    if (event.target[0].value === "" || event.target[1].value === "") {
      alert("Write a value dumb")
    } else {
      do {
        event.target[1].value -= 360
      } while (event.target[1].value > 360);
      const newForce = {
        amount: parseInt(event.target[0].value),
        angle: parseInt(event.target[1].value),
        name: "F" + num
      }
      setNum(num + 1)
      setForce(force => [...force, newForce])
    }
    setResultant([])
  }
  const getResultant = () => {
    let t = 0, b = 0, l = 0, r = 0;
    console.log(r, t, l, b);
    force.map((force) => {
      const { amount, angle } = force
      if (angle < 90) {
        r += amount * Math.cos(angle * Math.PI / 180)
        t += amount * Math.sin(angle * Math.PI / 180)
      } else if (180 > angle && angle > 90) {
        t += amount * Math.cos((angle - 90) * Math.PI / 180)
        l += amount * Math.sin((angle - 90) * Math.PI / 180)
      } else if (270 > angle && angle > 180) {
        l += amount * Math.cos((angle - 180) * Math.PI / 180)
        b += amount * Math.sin((angle - 180) * Math.PI / 180)
      } else if (360 > angle && angle > 270) {
        b += amount * Math.cos((angle - 270) * Math.PI / 180)
        r += amount * Math.sin((angle - 270) * Math.PI / 180)
      } else if (angle === 90) {
        t += amount;
      } else if (angle === 180) {
        l += amount;
      } else if (angle === 270) {
        b += amount;
      } else if (angle === 0) {
        r += amount;
      }
      if (r > l && t > b) {
        const newResultant = [{
          amount: Math.sqrt(Math.pow(r - l, 2) + Math.pow(t - b, 2)),
          angle: Math.atan((t - b) / (r - l)) * 180 / Math.PI,
        }]
        setResultant(newResultant)
      } else if (r > l && b > t) {
        const newResultant = [{
          amount: Math.sqrt(Math.pow(r - l, 2) + Math.pow(b - t, 2)),
          angle: Math.atan((b - t) / (r - l)) * 180 / Math.PI + 270,
        }]
        setResultant(newResultant)
      } else if (l > r && t > b) {
        const newResultant = [{
          amount: Math.sqrt(Math.pow(l - r, 2) + Math.pow(t - b, 2)),
          angle: Math.atan((t - b) / (l - r)) * 180 / Math.PI + 90,
        }]
        setResultant(newResultant)
      } else if (l > r && b > t) {
        const newResultant = [{
          amount: Math.sqrt(Math.pow(l - r, 2) + Math.pow(b - t, 2)),
          angle: Math.atan((b - t) / (l - r)) * 180 / Math.PI + 180,
        }]
        setResultant(newResultant)
      }
      return (r, t, l, b)
    })
  }
  const remove = e => {
    const name = e.target.getAttribute("name")
    setForce(force.filter(item => item.name !== name))
    console.log(force);
  }
  return (
    <div className="App">
      <div className="add">
        <form onSubmit={add}>
          <input type="number" name="amount" placeholder="Amount" id="amount" />
          <input type="number" name="angle" placeholder="Angle" id="angle" />
          <button type="submit">Add</button>
        </form>

        <button onClick={getResultant}>Get Resultant</button>
      </div>
      <div className="information">
        <div className="force-info">
          {
            force.map((force, index) => {
              const { amount, angle, name } = force;
              return (
                <div key={index}>
                  <span>Name : F{index + 1} </span>
                  <span>Amount: {amount} </span>
                  <span>Angle: {angle} </span>
                  <button onClick={remove} name={name}>Remove</button>
                </div>
              )
            })
          }
        </div>
        <div className="resultant-info">
          {
            resultant.map((res, index) => {
              const { amount, angle } = res;
              return (
                <div key={index}>
                  <span>Res is {amount} and his angle is {angle}</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="graph">
        {
          force.map((force, index) => {
            return (
              <div className="force" key={index} style={{ transform: `rotate(${90 - force.angle}deg)` }}></div>
            )
          })
        }
        {
          resultant.map((force, index) => {
            return (
              <div className="force resultant" key={index} style={{ transform: `rotate(${90 - force.angle}deg)` }}></div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
