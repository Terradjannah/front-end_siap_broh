import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose} className="close-button">Tutup</button>
      </div>
    </div>
  );
};

const SearchPage = () => {
  const [titleTerm, setTitleTerm] = useState('');
  const [authorTerm, setAuthorTerm] = useState('');
  const [titleResults, setTitleResults] = useState([]);
  const [authorResults, setAuthorResults] = useState([]);
  const [isSearchingTitle, setIsSearchingTitle] = useState(false);
  const [isSearchingAuthor, setIsSearchingAuthor] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  // berdasarkan judul
  const handleSearchByTitle = async (e) => {
    e.preventDefault();
    setIsSearchingTitle(true);

    try {
      const response = await axios.post('http://localhost:3000', { title: titleTerm });

      if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
          setModalMessage('Buku dengan judul tersebut tidak tersedia.');
          setIsModalOpen(true);
        } else {
          setTitleResults(response.data);
        }
      } else {
        setTitleResults([]);
        setModalMessage('Format respons tidak valid.');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error searching by title:', error);
      setModalMessage('Terjadi kesalahan saat mencari judul.');
      setIsModalOpen(true);
    } finally {
      setIsSearchingTitle(false);
    }
  };

  // berdasarkan penulis
  const handleSearchByAuthor = async (e) => {
    e.preventDefault();
    setIsSearchingAuthor(true);

    try {
      const response = await axios.post('http://localhost:3000/api/books/searchByAuthor', { author: authorTerm });

      if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
          setModalMessage('Buku oleh penulis tersebut tidak tersedia.');
          setIsModalOpen(true);
        } else {
          setAuthorResults(response.data);
        }
      } else {
        setAuthorResults([]);
        setModalMessage('Format respons tidak valid.');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error searching by author:', error);
      setModalMessage('Terjadi kesalahan saat mencari penulis.');
      setIsModalOpen(true);
    } finally {
      setIsSearchingAuthor(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Pencarian Buku</h1>

      <div className="search-section">
        <h2>Cari Berdasarkan Judul</h2>
        <form onSubmit={handleSearchByTitle} className="search-form">
          <input
            type="text"
            placeholder="Masukkan judul buku"
            value={titleTerm}
            onChange={(e) => setTitleTerm(e.target.value)}
            className="search-input"
            required
          />
          <button type="submit" className="search-button">Cari Judul</button>
        </form>
        {isSearchingTitle && <p className="loading">Sedang mencari judul...</p>}
        {Array.isArray(titleResults) && titleResults.length > 0 ? (
          <ul className="search-results">
            {titleResults.map((book) => (
              <li key={book.id} className="search-result-item">
                <strong>{book.title}</strong> - {book.author} ({book.year}, {book.pages} halaman)
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="search-section">
        <h2>Cari Berdasarkan Penulis</h2>
        <form onSubmit={handleSearchByAuthor} className="search-form">
          <input
            type="text"
            placeholder="Masukkan nama penulis"
            value={authorTerm}
            onChange={(e) => setAuthorTerm(e.target.value)}
            className="search-input"
            required
          />
          <button type="submit" className="search-button">Cari Penulis</button>
        </form>
        {isSearchingAuthor && <p className="loading">Sedang mencari penulis...</p>}
        {Array.isArray(authorResults) && authorResults.length > 0 ? (
          <ul className="search-results">
            {authorResults.map((book) => (
              <li key={book.id} className="search-result-item">
                <strong>{book.title}</strong> - {book.author} ({book.year}, {book.pages} halaman)
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default SearchPage;
