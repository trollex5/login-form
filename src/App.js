import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//import logo from './logo.svg';
//import './App.css';
import MainContainer from './components/MainContainer';

class App extends Component {

  render = () => {
    return (
      <div>
        <BrowserRouter>
          <MainContainer />
        </BrowserRouter>
      </div>
    )
  }
}

export default connect()(App);
