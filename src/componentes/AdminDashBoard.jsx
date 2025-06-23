
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { taskContext } from '../App';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AdminDashBoard = () => {
  const { task, setTask, filter } = useContext(taskContext);
console.log(task);

  useEffect(() => {
    fetchData();
  }, [filter]);

  // const fetchData = async () => {
  //   try {
  //     const query = {};
  //     if (filter.toLowerCase() !== "all") {
  //       query.status = filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase();
  //     }
  //     const res = await axios.get("http://localhost:4000/api/task/allTask", {
  //       params: query
  //     });
  //     setTask(res.data.formattedTasks);
  //     console.log(res.data);
      
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Fetched Token from LocalStorage:", token);

    if (!token) {
      alert("Token not found. Please log in again.");
      return;
    }

    const query = {};
    if (filter.toLowerCase() !== "all") {
      query.status = filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase();
    }

    const res = await axios.get("http://localhost:4000/api/task/allTask", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: query,
    });

    console.log("API Response:", res.data);
    setTask(res.data.formattedTasks);
  } catch (error) {
    console.error("Fetch error:", error.response?.data || error.message);
  }
};

  const handleDelete = async (id) => {
    try {
        const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/task/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
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
          {/* <div className="table-responsive">
            <table className="table table-bordered table-hover text-center pointer">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>TaskName</th>
                  <th>Description</th>
                  <th>Sub Task</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {task.map((item, index) => (
                  
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.taskname}</td>
                    <td>{item.description}</td>
                     <td>{item.subtask === "N/A" ? "—" : item.subtask}</td>
                    <td>{item.status}</td>
                    <td>
                       {item.updatedAt ?? "N/A"}
                    </td>
                    <td>
                      {item.deadline && !isNaN(new Date(item.deadline))
                        ? new Date(item.deadline).toLocaleDateString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })
                        : "N/A"}
                    </td>
                    <td>
                      <Link to={`/${item._id}`} className="btn btn-success btn-sm me-2">
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
          {Array.isArray(task) && task.length > 0 ? (
  <div className="table-responsive">
    <table className="table table-bordered table-hover text-center pointer">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Task Name</th>
          <th>Description</th>
          <th>Sub Task</th>
          <th>Status</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {task.map((item, index) => (
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.taskname}</td>
            <td>{item.description}</td>
            <td>{item.subtask === "N/A" ? "—" : item.subtask}</td>
            <td>{item.status}</td>
            <td>{item.createdAt ?? "N/A"}</td>
            <td>{item.deadline}</td>
            <td>
              <Link to={`/${item._id}`} className="btn btn-success btn-sm me-2">
                Edit
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p className="text-center text-muted">
    {Array.isArray(task) ? `No tasks found for status: ${filter}` : "Loading tasks..."}
  </p>
)}

      </div>
    </>
  );
};

export default AdminDashBoard;

