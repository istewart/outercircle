import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import css from '../css/main.css';

import CharityPage from './components/CharityPage.jsx';
import DonorPage from './components/DonorPage.jsx';
import Home from './components/Home.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import SearchPage from './components/SearchPage.jsx';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Home}/>
      <Route path='/donor/:id' component={DonorPage}/>
      <Route path='/charity' component={CharityPage}/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/signup' component={SignupPage}/>
      <Route path='/search/:keyWord' component={SearchPage}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <Routes/>,
  document.getElementById('app')
);
