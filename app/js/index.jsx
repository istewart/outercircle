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
import DonorPage from './components/donorPage.jsx';
import Title from './components/title.jsx';
import Home from './components/home.jsx';
// Commenting this out because crashes since stats.jsx doesn't exist
//import Stats from './components/stats.jsx';

const Routes = () => (
  <BrowserRouter>
    <div>
        <Route exact path='/' component={Home}/>
        <Route path='/images' component={IMGheader}/>
        <Route path='/donor' component={DonorPage}/>
        <Route path='/charity' component={Charity}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <Routes/>,
  document.getElementById('app')
);
