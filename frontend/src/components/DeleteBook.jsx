import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book:', error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/books/${id}`)
      .then(() => navigate('/'))
      .catch(error => console.error('Error deleting book:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Delete Book</h1>
      {book ? (
        <div>
          <p>Are you sure you want to delete <strong>{book.name}</strong>?</p>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        </div>
      ) : (
        <p>Book not found.</p>
      )}
    </div>
  );
};

export default DeleteBook;
