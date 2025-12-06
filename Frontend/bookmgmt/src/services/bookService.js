import axios from "axios";

// Change this to your Railway URL
const BASE_URL = "https://<your-app>.up.railway.app/api";

export const getBooks = () => axios.get(`${BASE_URL}/books`);

export const getBookById = (id) => axios.get(`${BASE_URL}/books/${id}`);

export const addBook = (book) => axios.post(`${BASE_URL}/books`, book);

export const deleteBook = (id) => axios.delete(`${BASE_URL}/delete/${id}`);

export const getGoogleDetails = (isbn) =>
  axios.get(`${BASE_URL}/proxy/google?isbn=${isbn}`);
