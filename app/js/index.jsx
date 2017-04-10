import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import css from '../css/main.css';

import IMGheader from './components/IMGheader.jsx';
import DonorPage from './components/donorPage.jsx';
import Title from './components/title.jsx';
import Home from './components/home.jsx';

const Routes = () => (
  <BrowserRouter>
    <div>
        <Route exact path='/' component={Home}/>
        <Route path='/images' component={IMGheader}/>
        <Route path='/donor' component={DonorPage}/>
        <Route path='/charity' component={Title}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <Routes/>,
  document.getElementById('app')
);
