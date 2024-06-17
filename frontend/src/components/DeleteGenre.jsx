import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteGenre = () => {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://app.test/genres/${id}`)
      .then(response => setGenre(response.data))
      .catch(error => console.error('Error fetching genre:', error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://app.test/genres/${id}`)
      .then(() => navigate('/genres'))
      .catch(error => console.error('Error deleting genre:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Delete Genre</h1>
      {genre ? (
        <div>
          <p>Are you sure you want to delete <strong>{genre.name}</strong>?</p>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        </div>
      ) : (
        <p>Genre not found.</p>
      )}
    </div>
  );
};

export default DeleteGenre;
