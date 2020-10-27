import React from 'react';
import ConnectedHeader from './Components/Header/Header.js';
import './App.css';
import Footer from './Components/Footer/Footer.js';
import PrivacyPolicy from './Components/Legal/PrivacyPolicy';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Product from './Components/Product/Product.js';
import Login from './Components/Login/Login.js';


function App() {
  return (
    <Router>
      <div className="App">


        <ConnectedHeader />
        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/privacy" component={PrivacyPolicy} />

          <Route path="/">
            <Product />
          </Route>

        </Switch>

        <Footer />


      </div>
    </Router>
  );
}

export default App;
