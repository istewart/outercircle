import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import css from '../css/main.css';

import Navbar from './components/navbar.jsx';
import Feed from './components/feed.jsx';
import IMGheader from './components/IMGheader.jsx';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Navbar/>

      <Route exact path='/' component={Feed}/>
      <Route path='/images' component={IMGheader}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <Routes/>,
  document.getElementById('app')
);
