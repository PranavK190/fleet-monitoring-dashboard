import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/landing/Landing";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import Fleet from "../pages/fleet/Fleet";
import FleetLiveLocation from "../pages/fleet-live/FleetLiveLocation";
import DriverList from "../pages/driver-list/DriverList";
import DriverProfile from "../pages/driver-profile/DriverProfile";
import DriverHistory from "../pages/driver-history/DriverHistory";
import Alert from "../pages/alert/Alert";
import AlertList from "../pages/alert-list/AlertList";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/fleet-live" element={<FleetLiveLocation />} />
        <Route path="/driver-list" element={<DriverList />} />
        <Route path="/driver-profile" element={<DriverProfile />} />
        <Route path="/driver-history" element={<DriverHistory />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/alert-list" element={<AlertList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;