import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import Navbar from './Components2/Navbar';
import Footer from './Components2/Footer';
import Body from './Components2/Body';
import Dashboard from './pages/Dashboard';
import Drivers from './pages/Drivers';
import UpcomingMaintenance from './pages/UpcomingMaintenance';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Router>
          <Navbar />
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/upcoming-maintenance" element={<UpcomingMaintenance />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
