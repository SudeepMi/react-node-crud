import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateBook = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [genreId, setGenreId] = useState('');
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://app.test/books/${id}`)
      .then(response => {
        setName(response.data.name);
        setGenreId(response.data.genreId);
      })
      .catch(error => console.error('Error fetching book:', error));
    axios.get('http://app.test/genres')
      .then(response => setGenres(response.data))
      .catch(error => console.error('Error fetching genres:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://app.test/books/${id}`, { name, genreId })
      .then(() => navigate('/'))
      .catch(error => console.error('Error updating book:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Update Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Book Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Genre</label>
          <select
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            className="border px-4 py-2 w-full"
          >
            <option value="" disabled>Select Genre</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default UpdateBook;
