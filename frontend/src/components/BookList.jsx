import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://app.test/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Book List</h1>
      <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add Book</Link>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50">Name</th>
            <th className="px-6 py-3 bg-gray-50">Genre</th>
            <th className="px-6 py-3 bg-gray-50">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td className="px-6 py-4 whitespace-nowrap">{book.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.genreName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/update/${book.id}`} className="bg-yellow-500 text-white px-2 py-1 ml-2 rounded">Update</Link>
                <Link to={`/delete/${book.id}`} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
