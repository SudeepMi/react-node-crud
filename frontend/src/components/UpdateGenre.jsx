import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateGenre = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://app.test/genres/${id}`)
      .then(response => setName(response.data.name))
      .catch(error => console.error('Error fetching genre:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://app.test/genres/${id}`, { name })
      .then(() => navigate('/genres'))
      .catch(error => console.error('Error updating genre:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Update Genre</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Genre Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 w-full"
          />
        </div>
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default UpdateGenre;
