import { Link } from "react-router-dom";

export default function NavbarComp() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Book Management</Link>

      <div>
        <Link className="btn btn-primary" to="/add">Add Book</Link>
      </div>
    </nav>
  );
}
