import { BrowserRouter, Routes, Route } from "react-router-dom";
import DecisionList from "./pages/DecisionList";
import DecisionDetail from "./pages/DecisionDetail";
import DecisionForm from "./pages/DecisionForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DecisionList />} />
        <Route path="/new" element={<DecisionForm />} />
        <Route path="/decisions/:id" element={<DecisionDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
