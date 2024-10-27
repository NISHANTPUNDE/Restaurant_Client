import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
function App() {
  // const [dark, setDark] = useState(false);

  // const darkModeHandler = () => {
  //   setDark(!dark);
  //   document.body.classList.toggle("dark");
  // };

  return (
    <Router>
      <Routes>
        <Route path="/:restaurant" element={<Menu />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/:restaurant" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
