import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import DeleteBook from './components/DeleteBook';
import GenreList from './components/GenreList';
import AddGenre from './components/AddGenre';
import UpdateGenre from './components/UpdateGenre';
import DeleteGenre from './components/DeleteGenre';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/update/:id" element={<UpdateBook />} />
          <Route path="/delete/:id" element={<DeleteBook />} />
          <Route path="/genres" element={<GenreList />} />
          <Route path="/genres/add" element={<AddGenre />} />
          <Route path="/genres/update/:id" element={<UpdateGenre />} />
          <Route path="/genres/delete/:id" element={<DeleteGenre />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
