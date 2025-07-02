import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableForm from "./pages/TableForm";
import TableDisplay from "./pages/TableDisplay";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />

        <Routes>
          <Route path="/" element={<TableForm />} />
          <Route path="/table" element={<TableDisplay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
