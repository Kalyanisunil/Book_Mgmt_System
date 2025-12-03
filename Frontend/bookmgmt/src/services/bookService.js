import axios from "axios";

const API_URL = "http://localhost:8080/api/books";

export const getBooks = () => axios.get("http://localhost:8080/api/books");
export const getBookById = (id) => axios.get(`${"http://localhost:8080/api/books"}/${id}`);
export const addBook = (book) => axios.post("http://localhost:8080/api/books", book);
export const deleteBook = (id) => axios.delete(`${"http://localhost:8080/api/delete"}/${id}`);

export const getGoogleDetails = (isbn) =>
  axios.get(`http://localhost:8080/api/proxy/google?isbn=${isbn}`);

