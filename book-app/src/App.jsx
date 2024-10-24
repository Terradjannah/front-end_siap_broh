import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import SearchPage from './pages/SearchPage';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Daftar Buku</Link> | <Link to="/search">Cari Buku</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<AllBooks />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
