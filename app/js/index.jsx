import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import css from '../css/main.css';

import Charity from './components/Charity.jsx';
import DonorPage from './components/DonorPage.jsx';
import Home from './components/Home.jsx';
import LoginPage from './components/LoginPage.jsx';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Home}/>
      <Route path='/donor' component={DonorPage}/>
      <Route path='/charity' component={Charity}/>
      <Route path='/login' component={LoginPage}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <Routes/>,
  document.getElementById('app')
);
