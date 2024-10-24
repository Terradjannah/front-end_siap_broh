import React, { useState, useEffect } from 'react';
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

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  //listBuku
  const fetchBooks = () => {
    axios.get('http://localhost:3000')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Error fetching books:', error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      year: parseInt(year, 10),
      pages: parseInt(pages, 10)
    };

    //tambah buku
    axios.post('http://localhost:3000/', newBook)
      .then(() => {
        setTitle('');
        setAuthor('');
        setYear('');
        setPages('');
        setModalMessage('Buku berhasil ditambahkan!');
        setIsModalOpen(true);
        fetchBooks();
      })
      .catch((error) => {
        console.error('Error adding book:', error);
        setModalMessage('Gagal menambahkan buku.');
        setIsModalOpen(true);
      });
  };

  return (
    <div className="all-books">
      <h1>Daftar Buku</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author} ({book.year}, {book.pages} halaman)
          </li>
        ))}
      </ul>

      <h2>Tambah Buku Baru</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Judul Buku"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Penulis"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Tahun Terbit"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Jumlah Halaman"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
        />
        <button type="submit">Simpan Buku</button>
      </form>

      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default AllBooks;
