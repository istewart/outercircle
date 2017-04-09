import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import css from '../css/main.css';

import Feed from './components/feed.jsx';
import IMGheader from './components/IMGheader.jsx';
import donorProfile from './components/donorProfile.jsx';
import Title from './components/title.jsx';
// This doesn't work because stats.jsx doesn't exist
//import Stats from './components/stats.jsx';

const Routes = () => (
  <BrowserRouter>
    <div>
        <Route exact path='/' component={Feed}/>
        <Route path='/images' component={IMGheader}/>
        <Route path='/donor' component={donorProfile}/>
        <Route path='/charity' component={Title}/>
      
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <Routes/>,
  document.getElementById('app')
);
