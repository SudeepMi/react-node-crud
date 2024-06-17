import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GenreList = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/genres')
      .then(response => setGenres(response.data))
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  return (
    <div className="p-4">
      <div className='flex gap-5 my-5'>
      <Link to="/genres/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add Genre</Link>
      <Link to="/" className="bg-red-500 text-white px-4 py-2 rounded">Book List</Link>
      </div>
      <h1 className="text-2xl mb-4">Genre List</h1>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead>
          <tr className='grid grid-cols-[1fr_1fr]'>
            <th className="px-6 py-3 bg-gray-50">Name</th>
            <th className="px-6 py-3 bg-gray-50">Actions</th>
          </tr>
        </thead>
        <tbody>
          {genres.map(genre => (
            <tr key={genre._id} className='grid grid-cols-[1fr_1fr] items-center'>
              <td className="px-6 py-4 whitespace-nowrap  text-center">{genre.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/genres/update/${genre._id}`} className="bg-yellow-500 text-white px-2 py-1 ml-2 rounded">Update</Link>
                <Link to={`/genres/delete/${genre._id}`} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenreList;
