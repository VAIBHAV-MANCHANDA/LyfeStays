import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import FloatingSearch from './components/FloatingSearch/FloatingSearch';
import Home from './pages/Home/Home';
import Rent from './pages/Rent/Rent';
import Buy from './pages/Buy/Buy';
import Owner from './pages/Owner/Owner';
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <FloatingSearch />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
