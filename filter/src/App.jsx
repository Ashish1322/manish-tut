import { useState } from "react";
import "./App.css";
import { food_list } from "./data";
function App() {
  const [foods, setFoods] = useState(food_list);
  const [results, setResults] = useState(food_list);

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    console.log(value);

    let filteredObject = foods.filter((item) => {
      if (item.name.includes(value)) {
        return item;
      }
    });

    setResults(filteredObject);
  };
  return (
    <div>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Enter category or name"
      />
      {results.map((item) => {
        return (
          <div style={{ border: "1px solid black" }}>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.category}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
