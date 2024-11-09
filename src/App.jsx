import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import BlackTheme from "./Menu_Card/BlackTheme";
import Theme2 from "./Menu_Card/Theme2";
import Theme3 from "./Menu_Card/Theme3";
import SuperAdmin from "./pages/SuperAdmin";
import Auth from "./pages/Auth";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/superadmin" element={<SuperAdmin />} />
        <Route path="/:restaurant" element={<Menu />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/:restaurant" element={<Admin />} />
        <Route path="/menucard/:restaurant" element={<BlackTheme />} />
        <Route path="/menucard1/:restaurant" element={<Theme2 />} />
        <Route path="/menucard2/:restaurant" element={<Theme3 />} />
      </Routes>
    </Router>
  );
}

export default App;
