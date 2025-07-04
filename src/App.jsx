import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import TableDisplay from "./pages/TableDisplay";
import TableForm from "./pages/TableForm";

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
