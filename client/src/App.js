import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRegistrationPage from './AdminPages/AdminRegisterPage';
import UserRegistrationPage from './UserPages/UserRegisterPage';
import LoginPage from './Pages/Login';
import AdminMainPage from './AdminPages/AdminMainPage'
import ResultsPage from './AdminPages/ResultsPage';
import UserMainPage from './UserPages/UserMainPage';
import LivePage from './Pages/LivePage';
import { SocketProvider } from './SocketContext';
import AppLayout from './components/AppLayout';

const App = () => {
  return (
    <SocketProvider>
    <Router>
      <AppLayout></AppLayout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/register" element={<AdminRegistrationPage />} />
        <Route path="/user/register" element={<UserRegistrationPage />} />
        <Route path="/admin/home" element={<AdminMainPage />} />
        <Route path="/admin/results" element={<ResultsPage />} />
        <Route path="/user/home" element={<UserMainPage />} />
        <Route path="/livePage" element={<LivePage />} />
      </Routes>
    </Router>
    </SocketProvider>
  );
};

export default App;
