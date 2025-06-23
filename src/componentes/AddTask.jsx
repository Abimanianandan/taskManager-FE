import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { taskContext } from '../App';

const AddTask = () => {
    const [error,setError] = useState("");
    const {task,setTask} = useContext(taskContext);
    const [newTask,setNewTask] = useState({
            name:"",
            taskname:"",
            description:"",
            subtask:"",
            deadline:""
        })
    const navigate = useNavigate();
           const handleSubmit = async(e) =>{
                e.preventDefault()
                try {
                      const res = await axios.post("http://localhost:4000/api/task/create",newTask)
                      alert("task created successfully") 
                      setTask(res.data.tasks)
                       console.log(task); 
                      setNewTask({name:"",taskname:"",description:"",deadline:"",subtask:""})
                      navigate("/admin")
                      window.location.reload()
                } catch (error) {
                     setError(
                          error.response ? error.response.data.message : "An error occurred"
                     ); 
                }
            }
            const handleChange = (e) =>{
               const{name,value} = e.target;
               setNewTask((preData)=>({...preData,[name]:value}))
            }
  return (
       <form
      className="d-flex gap-3 justify-content-center align-items-center mt-5"
      onSubmit={handleSubmit}
    >
      <div className="card bg-warning" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-center">
            Create task
          </h5>
           {error && <div className="error text-danger d-flex justify-content-center">{error}</div>}
          <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={newTask.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="TaskName"
              name="taskname"
              value={newTask.taskname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              name="description"
              value={newTask.description}
              onChange={handleChange}
              required
            />
          </div>
           <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Subtask"
              name="subtask"
              value={newTask.subtask}
              onChange={handleChange}
              required
            />
          </div>
           <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Deadline"
              name="deadline"
              value={newTask.deadline}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-auto mt-3">
            <Link to={"/admin"} className='btn btn-danger'>Cancel</Link>
            <button className="btn btn-primary ms-3" type="submit">
               Create Task
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddTask