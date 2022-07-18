import React from 'react';
import './App.css';
import NavBar from './Features/NavBar';
import * as ReactRouterDOM from 'react-router-dom'
import Login from './Features/Login';
import Blog from './Features/Blog';
import RequireAuthComponent from './Components/requireAuthComponent';
import Create from './Features/Create';

const App: React.FC = () => {
  return (
    <div>
      <div>
        <NavBar />
        <div>
          <ReactRouterDOM.Routes>
            <ReactRouterDOM.Route path='/' element={<Login/>}></ReactRouterDOM.Route>
            <ReactRouterDOM.Route path='/:uid' element={<RequireAuthComponent><Blog /></RequireAuthComponent>}></ReactRouterDOM.Route>
            <ReactRouterDOM.Route path='/:uid/create' element={<RequireAuthComponent><Create /></RequireAuthComponent>}></ReactRouterDOM.Route>
          </ReactRouterDOM.Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
