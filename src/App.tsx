import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SmartReviewFilter from "./components/reviews";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<SmartReviewFilter />} />
      </Routes>
    </div>
  );
}

export default App;
