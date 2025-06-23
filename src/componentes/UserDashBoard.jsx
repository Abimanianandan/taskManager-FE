
// // import React, { useContext, useEffect, useState } from 'react';
// // import { taskContext } from '../App';

// // const UserDashBoard = () => {
// //   const { task, setTask } = useContext(taskContext);
// //   const [loading, setLoading] = useState(true);
// //   const [filter, setFilter] = useState("Pending");

// //   useEffect(() => {
// //     fetchData();
// //   }, [filter]);

// //   const fetchData = async () => {
// //     try {
// //       const userId = localStorage.getItem("userId");
// //       if (!userId) {
// //         console.error("User ID missing in localStorage.");
// //         return;
// //       }

// //       const res = await axios.get("http://localhost:4000/api/task/allTask", {
// //         params: {
// //           user: userId,
// //           status: filter,
// //         },
// //       });

// //       setTask(res.data.tasks);
// //     } catch (error) {
// //       console.log("Error fetching tasks:", error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <h4 className="mb-4 text-center">Your Tasks - {filter}</h4>

// //       <div className="d-flex justify-content-end mb-3">
// //         <select
// //           className="form-select w-auto"
// //           value={filter}
// //           onChange={(e) => setFilter(e.target.value)}
// //         >
// //           <option value="Pending">Pending</option>
// //           <option value="Completed">Completed</option>
// //         </select>
// //       </div>

// //       {loading ? (
// //         <div className="text-center text-muted">Loading...</div>
// //       ) : task.length === 0 ? (
// //         <div className="text-center text-muted">No {filter.toLowerCase()} tasks found.</div>
// //       ) : (
// //         <div className="row row-cols-1 row-cols-md-3 g-4">
// //           {task.map((item, index) => (
// //             <div className="col d-flex" key={index}>
// //               <div className="card shadow p-4 mb-4 bg-body-tertiary rounded-4 w-100">
// //                 <div className="card-body text-center fw-bold">
// //                   <h5 className="card-title">Name: {item.name}</h5>
// //                   <ol className="text-secondary text-start">
// //                     <li><b className="text-dark">TaskName:</b> {item.taskname}</li>
// //                     <li><b className="text-dark">Description:</b> {item.description}</li>
// //                     <li><b className="text-dark">Status:</b> {item.status}</li>
// //                     <li><b className="text-dark">Date & Time:</b> {new Date(item.updatedAt).toLocaleString()}</li>
// //                   </ol>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserDashBoard;

import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { taskContext } from '../App';
import { Link } from 'react-router-dom';

const UserDashBoard = () => {
  const { task, setTask, filter } = useContext(taskContext);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/task/allTask");
      setTask(res.data.formattedTasks);
    } catch (error) {
      console.log(error.message);
    }
  };
console.log(task);

  return (
    <div className="container mt-5">
      {task.length === 0 ? (
        <p className="text-center text-muted">No tasks found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {task.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.taskname}</td>
                  <td>{item.description}</td>
                  <td>{item.subtask ? item.subtask :"Not Complete"}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        item.status === "Completed" ? "success" : "warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.updatedAt ?? "N/A"}
                  </td>
                  <td>{item.deadline}</td>
                  <td>
                    <Link
                      className="btn btn-sm btn-success"
                      to={`/user/${item._id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDashBoard;
