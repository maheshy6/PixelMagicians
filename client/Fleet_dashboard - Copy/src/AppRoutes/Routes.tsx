import Login from "@/Pages/login";
import React from "react";
import ThemeProvider from "@/providers/ThemeProvider";
import { BrowserRouter as Router, Routes as RouterRoutes, Route } from "react-router-dom";
import Navbar from "@/Components2/Navbar";
import Body from "@/Components2/Body";
import DriverManagement from "@/Pages/Drivers";
import UpcomingMaintenance from "@/Pages/UpcomingMaintenance";
import Dashboard from "@/Pages/Dashboard";
import Footer from "@/Pages/Footer";
import DriverRegistration from "@/Pages/Register";
//import FleetManagerPro from "@/Pages/Trackvehicle";
import PrivateRoute from "./privateroute";
import EmergencyRoutes from "@/Pages/EmergencyRoutes";
import PoliceService from "@/Emergency-pages/PoliceService";
import FireBrigadeService from "@/Emergency-pages/FireBrigadeService";
import AmbulanceService from "@/Emergency-pages/AmbulanceService";
import Signup from "@/Pages/Signup";
import FleetManagerPro from "@/Pages/Trackvehicle";

const AppRoutes: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Router>
          <Navbar />
          <div className="p-6">
            <RouterRoutes>
              <Route path="/login" element={<Login/>} />
              <Route path="/" element={<PrivateRoute element={<Body />} />} />
              <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
              <Route path="/drivers" element={<PrivateRoute element={<DriverManagement />} />} />
              <Route 
                path="/upcoming-maintenance" 
                element={<PrivateRoute element={<UpcomingMaintenance />} />} 
              />
              <Route path="/register" element={<PrivateRoute element={<DriverRegistration />} />} />
              <Route path="/track" element={<PrivateRoute element={<FleetManagerPro/>} />} />
              <Route path='/ambulance' element={<AmbulanceService/>}/>
              <Route path='/fire' element={<FireBrigadeService/>}/>
              <Route path='/police' element={<PoliceService/>}/>
              <Route path='/emergencyroute' element={<EmergencyRoutes/>}/>
              <Route path='/signup' element={<Signup/>}/>
            </RouterRoutes>
          </div>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default AppRoutes;
