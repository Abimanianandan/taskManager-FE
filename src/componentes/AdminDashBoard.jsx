import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { taskContext } from '../App';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AdminDashBoard = () => {
  const { task, setTask, filter } = useContext(taskContext);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const query = {};

      if (filter.toLowerCase() !== "all") {
        query.status = filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase();
      }

      console.log("Filter query being sent:", query);

      const res = await axios.get("https://task-manager-be-g036.onrender.com/api/task/allTask", {
        params: query
      });

      setTask(res.data.tasks);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://task-manager-be-g036.onrender.com/api/task/${id}`);
      alert('Task deleted successfully');
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {task.length === 0 && (
            <p className="text-center text-muted">No tasks found for status: {filter}</p>
          )}
          {task.map((item, index) => (
            <div className="col d-flex" key={index}>
              <div className="card shadow p-4 mb-5 bg-body-tertiary rounded-4 w-100">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Name: {item.name}</h5>
                  <ol className="text-secondary text-start">
                    <li><b className="text-dark">TaskName:</b> {item.taskname}</li>
                    <li><b className="text-dark">Description:</b> {item.description}</li>
                    <li><b className="text-dark">Status:</b> {item.status}</li>
                    <li><b className="text-dark">Date & Time:</b> {new Date(item.updatedAt).toLocaleString()}</li>
                  </ol>
                  <div className="d-flex gap-3">
                    <Link to={`/${item._id}`} className="btn btn-success">Edit</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
