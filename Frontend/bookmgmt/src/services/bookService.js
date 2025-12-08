import axios from "axios";

// Change this to your Railway URL
const BASE_URL = "https://bookmgmtsystem-production.up.railway.app/api";


export const getBooks = () => axios.get(`${BASE_URL}/books`);

export const getBookById = (id) => axios.get(`${BASE_URL}/books/${id}`);

export const addBook = (book) => axios.post(`${BASE_URL}/books`, book);

export const deleteBook = (id) => axios.delete(`${BASE_URL}/delete/${id}`);

export const getGoogleDetails = (isbn) =>
  axios.get(`${BASE_URL}/proxy/google?isbn=${isbn}`);



// import axios from "axios";

// // Use local backend
// const BASE_URL = "http://localhost:8080/api";

// export const getBooks = () => axios.get(`${BASE_URL}/books`);

// export const getBookById = (id) => axios.get(`${BASE_URL}/books/${id}`);

// export const addBook = (book) => axios.post(`${BASE_URL}/books`, book);

// export const deleteBook = (id) => axios.delete(`${BASE_URL}/delete/${id}`);

// export const getGoogleDetails = (isbn) =>
//   axios.get(`${BASE_URL}/google?isbn=${isbn}`);
