import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div id="dietary-filters">
        <label>
          <input type="checkbox" value="vegetarian" /> Vegetarian
        </label>
        <label>
          <input type="checkbox" value="dairy-free" /> Dairy-Free
        </label>
      </div>
      <button id="apply-filters">Apply Filters</button>
      <div id="filtered-recipes"></div>
    </>
  );
}

export default App;
