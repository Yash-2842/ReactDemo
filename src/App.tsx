import React from 'react';
import logo from './logo.svg';
import {Redirect, Route} from 'react-router'
import './App.css';
import Admin from './pages/Admin';
import CountryData from './components/CountryData';
import CountryForm from './components/CountryForm';
import CityData from './components/CityData';

function App() {
  return (
    <div className="App">
      <Route path='/' exact>
        <Redirect to='/admin/country' />
      </Route>
      <Route path='/admin'>
        <Admin />
      </Route>
      <Route path='/admin/country' exact>
        <CountryData />
      </Route>
      <Route path='/admin/city' exact>
        <CityData />
      </Route>
      <Route path='/admin/country/view/:id'>
        <CountryForm />
      </Route>
      <Route path='/admin/country/edit/:id'>
        <CountryForm />
      </Route>
      <Route path='/admin/country/add'>
        <CountryForm />
      </Route>
    </div>
  );
}

export default App;
