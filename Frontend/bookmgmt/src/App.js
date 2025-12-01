import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import BookDetails from "./pages/BookDetails";
import NavbarComp from "./Components/NavbarComp";

function App() {
  return (
    <Router>
      <NavbarComp />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
