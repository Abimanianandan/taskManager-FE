import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { taskContext } from '../App';

const Navbar = () => {
  const { filter, setFilter } = useContext(taskContext);

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand">All Task</span>
        <form className="d-flex gap-5" role="search">
          <div className="dropdown">
            <button
              className="btn btn-warning dropdown-toggle"
              type="button"
              id="basicDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
            <ul className="dropdown-menu" aria-labelledby="basicDropdown">
              <li>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => setFilter("All")}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => setFilter("Pending")}
                >
                  Pending
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => setFilter("Completed")}
                >
                  Completed
                </button>
              </li>
            </ul>
          </div>
          <Link to="/add" className="btn btn-primary">
            Create Task
          </Link>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
