import React, { useEffect, useState } from 'react'
import axios from "axios";

const App = () => {

  const [eFruit, setEFruit] = useState("");
  const [fruit, setFruit] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/fruitlist").
      then((res) => {
        setFruit(res.data.fruits)
      })
  }, [])

  const handleAdd = () => {

    if (!eFruit.trim()) return;

    axios.post("http://localhost:5000/fruitlist", { newFruit: eFruit }).
      then(() => {
        setFruit([...fruit, { name: eFruit }]);
        setEFruit("");
      })
      .catch((err) => {
        console.log("Error:", err)
      })
  }

  const handleDel = (deleteToFruit) => {

    axios.delete(`http://localhost:5000/fruitlist/${deleteToFruit}`)
      .then((res) => {
        setFruit(res.data.fruits);
      })
      .catch((err) => console.log("Delete Fruit Error:", err ))

  }

  return (
    <div>
      <input
        type="text"
        placeholder='Enter fruit name'
        onChange={(e) => setEFruit(e.target.value)}
        value={eFruit}
      />
      <button onClick={handleAdd}>Add fruit</button>

      <div>
        {
          fruit.map((item, index) => {
            return (
              <div key={index} >
                <h1 >{item.name}</h1>
                <button onClick={() => handleDel(item.name)}>Delete</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App