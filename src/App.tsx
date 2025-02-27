import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SmartReviewFilter from "./components/reviews";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<SmartReviewFilter />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </div>
    </Suspense>
  );
}

export default App;
