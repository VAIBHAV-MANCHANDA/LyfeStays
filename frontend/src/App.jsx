import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import FloatingSearch from './components/FloatingSearch/FloatingSearch';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import Rent from './pages/Rent/Rent';
import Buy from './pages/Buy/Buy';
import Owner from './pages/Owner/Owner';
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { clearSession, getStoredSession, storeSession } from './utils/auth';
import './App.css';

function App() {
  const [session, setSession] = useState(() => getStoredSession());

  const handleAuthSuccess = (nextSession) => {
    setSession(nextSession);
    storeSession(nextSession);
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
  };

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar session={session} onLogout={handleLogout} />
      <FloatingSearch />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route
          path="/login"
          element={<Login onAuthSuccess={handleAuthSuccess} session={session} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
