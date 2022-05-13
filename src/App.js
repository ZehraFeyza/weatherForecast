import React from "react";
import { BrowserRouter } from "react-router-dom";
import DznRoute from "./route/DznRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <DznRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
