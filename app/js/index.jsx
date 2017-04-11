import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import css from '../css/main.css';

import DonorPage from './components/donorPage.jsx';
import Home from './components/home.jsx';
import Charity from './components/charity.jsx';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Home}/>
      <Route path='/donor' component={DonorPage}/>
      <Route path='/charity' component={Charity}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <Routes/>,
  document.getElementById('app')
);
