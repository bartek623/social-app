import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
