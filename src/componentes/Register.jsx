import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [error,setError] = useState("");
    const [newUser,setNewUser] = useState({
            name:"",
            password:""
        })
    const navigate = useNavigate();
           const handleSubmit = async(e) =>{
                e.preventDefault()
                try {
                      const res = await axios.post("https://task-manager-be-g036.onrender.com/api/user/register",newUser)
                      alert("user created successfully")              
                      setUsers(res.data.users)
                      setNewUser({name:"",password:""})
                      navigate("/login")
                } catch (error) {
                     setError(
                          error.response ? error.response.data.message : "An error occurred"
                     ); 
                }
            }
            const handleChange = (e) =>{
               const{name,value} = e.target;
               setNewUser((preData)=>({...preData,[name]:value}))
            }
  return (
     <form
      className="d-flex gap-3 justify-content-center align-items-center mt-5"
      onSubmit={handleSubmit}
    >
      <div className="card bg-warning" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-center">
            Register
          </h5>
           {error && <div className="error text-danger d-flex justify-content-center">{error}</div>}
          <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-auto mt-3">
            <button className="btn btn-primary ms-3" type="submit">
               Register
            </button>
            <p>Already have an account? <Link to={"/login"}>Sing in</Link></p>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Register