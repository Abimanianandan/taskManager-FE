import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { taskContext } from '../App';

const Login = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState({
    name: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setUser } = useContext(taskContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/user/login', data);

      if (res.data.token) {
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user)); 

        setUser(res.data.user); 

        alert('Login successfully');
        setData({ name: '', password: '' });

        navigate(res.data.user.name === 'Abimani' ? '/admin' : '/user');
      }
    } catch (error) {
      setError(
        error.response ? error.response.data.message : 'An error occurred'
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form
      className="d-flex gap-3 justify-content-center align-items-center mt-5"
      onSubmit={handleSubmit}
    >
      <div className="card bg-warning" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-center">Login</h5>
          {error && (
            <div className="error text-danger d-flex justify-content-center">
              {error}
            </div>
          )}
          <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-auto mt-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-auto mt-3">
            <button className="btn btn-primary ms-3" type="submit">
              Login
            </button>
            <p className="mt-2">
              Don't have an account? <Link to="/">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
