import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../services/bookService";


export default function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    publicationDate: "",
    isbn: "",
    genre: "",
    rating: ""
  });

  const [errors, setErrors] = useState({});

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Fantasy",
    "Romance",
    "Sci-Fi",
    "Others"
  ];

  
  const validate = () => {
    let temp = {};

    if (!book.title) temp.title = "Title is required";
    else if (book.title.length > 100)
      temp.title = "Max 100 characters allowed";

    if (!book.author) temp.author = "Author is required";
    else if (book.author.length > 50)
      temp.author = "Max 50 characters allowed";

    if (!book.publicationDate)
      temp.publicationDate = "Publication date is required";

    if (!book.isbn) temp.isbn = "ISBN is required";
    else if (!/^\d{13}$/.test(book.isbn))
      temp.isbn = "ISBN must be exactly 13 digits";

    if (!book.genre) temp.genre = "Genre is required";

    if (!book.rating) temp.rating = "Rating is required";
    else if (book.rating < 1 || book.rating > 5)
      temp.rating = "Rating must be between 1 and 5";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await addBook(book);
      alert("Book added successfully!");

      navigate("/"); 
    } catch (error) {
      alert("Error adding book");
      console.log(error);
    }
  };


  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Add New Book</h3>

      <form onSubmit={handleSubmit}>
       
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${errors.title && "is-invalid"}`}
            name="title"
            value={book.title}
            onChange={handleChange}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

      
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className={`form-control ${errors.author && "is-invalid"}`}
            name="author"
            value={book.author}
            onChange={handleChange}
          />
          {errors.author && (
            <div className="invalid-feedback">{errors.author}</div>
          )}
        </div>

        
        <div className="mb-3">
          <label className="form-label">Publication Date</label>
          <input
            type="date"
            className={`form-control ${
              errors.publicationDate && "is-invalid"
            }`}
            name="publicationDate"
            value={book.publicationDate}
            onChange={handleChange}
          />
          {errors.publicationDate && (
            <div className="invalid-feedback">
              {errors.publicationDate}
            </div>
          )}
        </div>

       
        <div className="mb-3">
          <label className="form-label">ISBN (13 digits)</label>
          <input
            type="text"
            className={`form-control ${errors.isbn && "is-invalid"}`}
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
          />
          {errors.isbn && (
            <div className="invalid-feedback">{errors.isbn}</div>
          )}
        </div>

       
        <div className="mb-3">
          <label className="form-label">Genre</label>
          <select
            className={`form-select ${errors.genre && "is-invalid"}`}
            name="genre"
            value={book.genre}
            onChange={handleChange}
          >
            <option value="">-- Select Genre --</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genre && (
            <div className="invalid-feedback">{errors.genre}</div>
          )}
        </div>

       
        <div className="mb-3">
          <label className="form-label">Rating (1 - 5)</label>
          <input
            type="number"
            className={`form-control ${errors.rating && "is-invalid"}`}
            name="rating"
            value={book.rating}
            onChange={handleChange}
            min="1"
            max="5"
          />
          {errors.rating && (
            <div className="invalid-feedback">{errors.rating}</div>
          )}
        </div>

        <button type="submit" className="btn btn-success">
          Add Book
        </button>
      </form>
    </div>
  );
}
