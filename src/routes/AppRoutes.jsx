import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/landing/Landing";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

import Dashboard from "../pages/dashboard/Dashboard";

import Profile from "../pages/profile/Profile";
import UpdateProfile from "../pages/profile/UpdateProfile";

import Fleet from "../pages/fleet/Fleet";
import AddFleet from "../pages/fleet-add/AddFleet";
import UpdateFleet from "../pages/fleet-update/UpdateFleet";
import FleetLiveLocation from "../pages/fleet-live/FleetLiveLocation";

import DriverList from "../pages/driver-list/DriverList";
import AddDriver from "../pages/driver-add/AddDriver";
import UpdateDriver from "../pages/driver-update/UpdateDriver";
import DriverProfile from "../pages/driver-profile/DriverProfile";
import DriverHistory from "../pages/driver-history/DriverHistory";

import Alert from "../pages/alert/Alert";
import AlertList from "../pages/alert-list/AlertList";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* User Profile */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/update-profile"
            element={<UpdateProfile />}
          />

          {/* Fleet */}
          <Route
            path="/fleet"
            element={<Fleet />}
          />

          <Route
            path="/fleet-add"
            element={<AddFleet />}
          />

          <Route
            path="/fleet-update"
            element={<UpdateFleet />}
          />

          <Route
            path="/fleet-live"
            element={<FleetLiveLocation />}
          />

          {/* Drivers */}
          <Route
            path="/driver-list"
            element={<DriverList />}
          />

          <Route
            path="/driver-add"
            element={<AddDriver />}
          />

          <Route
            path="/driver-update"
            element={<UpdateDriver />}
          />

          <Route
            path="/driver-profile"
            element={<DriverProfile />}
          />

          <Route
            path="/driver-history"
            element={<DriverHistory />}
          />

          {/* Alerts */}
          <Route
            path="/alert"
            element={<Alert />}
          />

          <Route
            path="/alert-list"
            element={<AlertList />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;