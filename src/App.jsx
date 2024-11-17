import { Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import BlackTheme from "./Menu_Card/BlackTheme";
import Theme2 from "./Menu_Card/Theme2";
import Theme3 from "./Menu_Card/Theme3";
import SuperAdmin from "./pages/SuperAdmin";
import EditMenuCard from "./pages/EditMenuCard";
import ViewRestaurants from "./pages/ViewRestaurants";
import Auth from "./pages/Auth";
import Navbar from "./components/superadmin/Navbar";
import ManageSubscriptions from "./pages/ManageSubscriptions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />

      <Route
        path="/superadmin"
        element={
          <>
            <Navbar />
            <SuperAdmin />
          </>
        }
      />
      <Route
        path="/superadmin/viewrestaurants"
        element={
          <>
            <Navbar />
            <ViewRestaurants />
          </>
        }
      />
      <Route
        path="/superadmin/editrestaurants"
        element={
          <>
            <Navbar />
            <ManageSubscriptions />
          </>
        }
      />

      <Route path="/:restaurant" element={<Menu />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/:restaurant" element={<Admin />} />
      <Route path="/admin/edit/:restaurant" element={<EditMenuCard />} />
      <Route path="/menucard/:restaurant" element={<BlackTheme />} />
      <Route path="/menucard1/:restaurant" element={<Theme2 />} />
      <Route path="/menucard2/:restaurant" element={<Theme3 />} />
    </Routes>
  );
}

export default App;
