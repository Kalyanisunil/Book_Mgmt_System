import React, { useEffect, useState } from "react";
import { getBookById } from "../services/bookService";
import { useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    const res = await getBookById(id);
    setBook(res.data);
  };

  if (!book) return <h4 className="text-center mt-4">Loading...</h4>;

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-4">📘 Book Details</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className="nav-link active fw-semibold">Basic Details</button>
        </li>
      </ul>

      {/* Card */}
      <div className="card shadow-sm p-4 mt-3">
        <h5 className="fw-bold mb-3">Basic Information</h5>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="fw-semibold text-secondary">Title</label>
            <p className="fs-5">{book.title}</p>
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-semibold text-secondary">Author</label>
            <p className="fs-5">{book.author}</p>
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-semibold text-secondary">Genre</label>
            <p className="fs-5">{book.genre}</p>
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-semibold text-secondary">
              Publication Date
            </label>
            <p className="fs-5">{book.publicationDate}</p>
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-semibold text-secondary">ISBN</label>
            <p className="fs-5">{book.isbn}</p>
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-semibold text-secondary">Rating</label>
            <p className="fs-5">{book.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
