import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const AddBook = () => {
  const [name, setName] = useState('');
  const [genreId, setGenreId] = useState('');
  const [genres, setGenres] = useState([]);
  const [fileBlob, setFileBlob] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/genres')
      .then(response => setGenres(response.data))
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/books', { name, genreId, image: fileBlob })
      .then(() => navigate('/'))
      .catch(error => alert('Error adding book:', error.response.statusText));
  };


  const handleFile =(e) => {
   const file = e.target.files[0];
   const reader = new FileReader();
   reader.onload = function(event) {
    console.log(event.target)
      setFileBlob(event.target.result);
    }
    reader.readAsDataURL(file)

  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Add Book</h1>
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
              <option key={genre._id} value={genre._id}>{genre.name}</option>
            ))}
          </select>
          {
            genres.length == 0  && <div><Link to="/genres/add" className="text-blue-500 underline">No Genres found. Add Few</Link></div>
          }

          <input type='file' className="my-3" onChange={e=>handleFile(e)} />
          <img src={fileBlob} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </form>
    </div>
  );
};

export default AddBook;
