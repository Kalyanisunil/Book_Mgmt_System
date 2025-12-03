import React, { useEffect, useState } from "react";
import { getBookById } from "../services/bookService";
import { getGoogleDetails } from "../services/bookService";
import { useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const [activeTab, setActiveTab] = useState("basic");
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    const res = await getBookById(id);
    setBook(res.data);
  };

 const showMore = (isbn) => {
  getGoogleDetails(isbn)
    .then((response) => {
      console.log("Google API data:", response.data);
      const details = response.data.items?.[0]?.volumeInfo;
      setSelectedBook(details);
      setActiveTab("more");   // switch to the tab
    })
    .catch((err) => console.log(err));
};

  if (!book) return <h4 className="text-center mt-4">Loading...</h4>;

  return (
    <div className="container mt-4">

      <h3 className="fw-bold mb-4">Book Details</h3>

      {/* TABS */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold ${activeTab === "basic" ? "active" : ""}`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Details
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link fw-semibold ${activeTab === "more" ? "active" : ""}`}
            onClick={() => showMore(book.isbn)}
          >
            More Details
          </button>
        </li>
      </ul>

      {/* BASIC DETAILS TAB */}
      {activeTab === "basic" && (
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
              <label className="fw-semibold text-secondary">Publication Date</label>
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
      )}

      {/* MORE DETAILS TAB */}
      {activeTab === "more" && (
        <div className="card shadow-sm p-4 mt-3">
          {!selectedBook ? (
            <p>Loading more details...</p>
          ) : (
            <>
                <h5 className="fw-bold mb-3">More Information</h5>
                {/* IMAGE */}
        {selectedBook.imageLinks?.thumbnail && (
          <img
            src={selectedBook.imageLinks.thumbnail}
            alt="Book cover"
            className="img-fluid mb-3"
            style={{ maxWidth: "200px", borderRadius: "10px" }}
          />
        )}
              <p><strong>Categories:</strong> {selectedBook.categories}</p>
              <p><strong>Publisher:</strong> {selectedBook.publishedDate}</p>
                <p><strong>Description:</strong> {selectedBook.description}</p>
                
              
              <p><strong>Language:</strong> {selectedBook.language}</p>
            </>
          )

          }
        </div>
      )}
    </div>
  );
}
