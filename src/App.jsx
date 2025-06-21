import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTask from './componentes/AddTask';
import EditTask from './componentes/EditTask';
import AdminDashBoard from './componentes/AdminDashBoard';
import UserDashBoard from './componentes/UserDashBoard';
import Register from './componentes/Register';
import Login from './componentes/Login';
import UserEdit from './componentes/UserEdit';

export const taskContext = createContext();

const App = () => {
  const [task, setTask] = useState([]);
  const [user, setUser] = useState(null);
   const [filter, setFilter] = useState("All");

  return (
    <BrowserRouter>
      <taskContext.Provider value={{ task, setTask, user, setUser,filter,setFilter }}>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
            <>
              <Route path='/admin' element={<AdminDashBoard />} />
              <Route path='/user' element={<UserDashBoard />} />
              <Route path='/add' element={<AddTask />} />
              <Route path='/:id' element={<EditTask />} />
              <Route path='/user/:id' element={<UserEdit />}/>
            </>
        </Routes>
      </taskContext.Provider>
    </BrowserRouter>
  );
};

export default App;
