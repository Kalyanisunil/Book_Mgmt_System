import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/bookService";

import { useNavigate } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination
  const [page, setPage] = useState(1);
  const booksPerPage = 10;

  const navigate = useNavigate();

  // Fetch books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  // sorting
  const sortBooks = (field) => {
    let order = sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sorted = [...books].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setBooks(sorted);
  };

  // pagination 
  const startIndex = (page - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = books.slice(startIndex, endIndex);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div className="container mt-4">
      <h3>Book List</h3>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th onClick={() => sortBooks("title")} style={{ cursor: "pointer" }}>
              Title {sortField === "title" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>

            <th onClick={() => sortBooks("author")} style={{ cursor: "pointer" }}>
              Author {sortField === "author" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>

            <th onClick={() => sortBooks("genre")} style={{ cursor: "pointer" }}>
              Genre {sortField === "genre" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>

            <th onClick={() => sortBooks("rating")} style={{ cursor: "pointer" }}>
              Rating {sortField === "rating" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentBooks.map((book) => (
            <tr
              key={book.id}
              onClick={() => navigate(`/book/${book.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.rating}</td>

              <td onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <div className="d-flex justify-content-center gap-2">
        <button
          className="btn btn-secondary btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn btn-sm ${page === index + 1 ? "btn-primary" : "btn-light"}`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-secondary btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
