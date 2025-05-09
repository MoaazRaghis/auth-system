import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { Container } from '@mui/material';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import { Navigate } from 'react-router-dom';

// Replace the Profile route with:

function App() {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
  path="/profile"
  element={
    user ? <Profile /> : <Navigate to="/login" />
  }
/>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

// Simple Home Component
function Home() {
  return <h2>Welcome to the Auth System</h2>;
}

export default App;