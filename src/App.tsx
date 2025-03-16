import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Dashboard from './dashboard/pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Learning from './dashboard/pages/Learning';
import CourseDetail from './dashboard/pages/CourseDetail';
import Stocks from './dashboard/pages/Stocks';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/learning" element={<Learning />} />
          <Route path="/dashboard/learning/course/:courseId" element={<CourseDetail />} />
          <Route path="/dashboard/stocks" element={<Stocks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;