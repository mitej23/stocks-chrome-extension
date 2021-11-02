import { useState } from "react";
import "./App.css";

function App() {
  const [stocks] = useState([{ name: "AAPL", price: "200" }]);

  return (
    <div className="App">
      Stocks extension
      {stocks ? (
        stocks.map((stock, index) => {
          return (
            <div key={index}>
              <p>{stock.name}</p>
              <p>{stock.price}</p>
            </div>
          );
        })
      ) : (
        <p>Add Stocks</p>
      )}
    </div>
  );
}

export default App;
