import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
function App() {
  // const [dark, setDark] = useState(false);

  // const darkModeHandler = () => {
  //   setDark(!dark);
  //   document.body.classList.toggle("dark");
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
