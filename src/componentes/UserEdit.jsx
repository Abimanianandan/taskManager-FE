import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { taskContext } from '../App';

const UserEdit = () => {
    const{id} = useParams();
    const [error,setError] = useState("");
    const {task,setTask} = useContext(taskContext);
    const [editTask,setEditTask] = useState({
            name:"",
            taskname:"",
            description:"",
            status:""
        })
    const navigate = useNavigate();
    useEffect(()=>{
        getData()
    },[])
         const getData = async ()=>{
            try {
                const res = await axios.get(`https://task-manager-be-g036.onrender.com/api/task/${id}`)
                setEditTask(res.data.task)
            } catch (error) {
                console.log(error.message);
            }
         }
           const handleSubmit = async(e) =>{
                e.preventDefault()
                try {
                      const res = await axios.put(`https://task-manager-be-g036.onrender.com/api/task/${id}`,editTask)
                      alert("task update successfully")              
                      setTask(res.data.tasks)
                      setEditTask({name:"",taskname:"",description:"",status:""})
                      navigate("/user")
                      window.location.reload()
                } catch (error) {
                     setError(
                          error.response ? error.response.data.message : "An error occurred"
                     ); 
                }
            }
            const handleChange = (e) =>{
               const{name,value} = e.target;
               setEditTask((preData)=>({...preData,[name]:value}))
            }
  return (
       <form
      className="d-flex gap-3 justify-content-center align-items-center mt-5"
      onSubmit={handleSubmit}
    >
      <div className="card bg-warning" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-center">
            Edit task
          </h5>
           {error && <div className="error text-danger d-flex justify-content-center">{error}</div>}
          <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Status"
              name="status"
              value={editTask.status}
              onChange={handleChange}
              required
            />
          </div>
         
          
          <div className="col-auto mt-3">
            <Link to={"/user"} className='btn btn-danger'>Cancel</Link>
            <button className="btn btn-primary ms-3" type="submit">
               Update Task
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default UserEdit