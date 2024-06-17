import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="p-4">
      <p>The book CRUD (Create, Read, Update, Delete) project implemented in React and Express with MongoDB allows users to manage books efficiently. It includes features for adding, viewing, updating, and deleting books, supported by Axios for API calls and Mongoose for MongoDB interactions.</p>
      <div className='p-10 flex gap-10'>
      <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add Book</Link>
      <Link to="/genres" className="bg-red-500 text-white px-4 py-2 rounded">Book Genre</Link>
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-4 w-full">
        <thead>
          <tr className='grid grid-cols-[1fr_1fr_1fr_1fr]'>
            <th className="px-6 py-3 bg-gray-50">Name</th>
            <th className="px-6 py-3 bg-gray-50">Genre</th>
            <th className="px-6 py-3 bg-gray-50">Image</th>
            <th className="px-6 py-3 bg-gray-50">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 && books.map(book => (
            <tr key={book._id} className='grid grid-cols-[1fr_1fr_1fr_1fr]'>
              <td className="px-6 py-4 whitespace-nowrap">{book.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.genreId?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={book.image} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/update/${book._id}`} className="bg-yellow-500 text-white px-2 py-1 ml-2 rounded">Update</Link>
                <Link to={`/delete/${book._id}`} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
