import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/bookService";

import { useNavigate } from "react-router-dom";
import DeleteModal from "../Components/DeleteModal";

export default function BookList() {
  const [books, setBooks] = useState([]);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [deleteId, setDeleteId] = useState(null);

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
 const sortBooks = (option) => {
  if (!option) return;

  const [field, order] = option.split("-");

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


   const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await deleteBook(deleteId);
    setShowDeleteModal(false);
    fetchBooks();
  };

  return (
    <div className="container mt-4">
      <h3>Book List</h3>
      <div className="mb-3 d-flex gap-2">

  <select
    className="form-select w-auto"
    onChange={(e) => sortBooks(e.target.value)}
  >
    <option value="">Sort By</option>
    <option value="title-asc">Title (A → Z)</option>
    <option value="title-desc">Title (Z → A)</option>
    <option value="author-asc">Author (A → Z)</option>
    <option value="author-desc">Author (Z → A)</option>
    <option value="rating-asc">Rating (Low → High)</option>
    <option value="rating-desc">Rating (High → Low)</option>
    <option value="genre-asc">Genre (A → Z)</option>
    <option value="genre-desc">Genre (Z → A)</option>
  </select>

</div>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            
            <th>Book Id</th>
             <th>Title</th>
            <th>Author</th>
             <th>Genre</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentBooks.map((book) => (
            <tr
              key={book.id}
              onClick={() => navigate(`/book/${book.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{book.bookId}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.rating}</td>

              <td onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => openDeleteModal(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* delete confirmation modal */}
      
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />

     
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
