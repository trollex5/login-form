import React, { Component } from 'react';

import Logged from './Logged';
import Login from './Login';
import Registration from './Register';
import { Switch, Route } from 'react-router-dom';


export default class MainComponent extends Component {
    
    render = () => {
        
        return (
            <div className='container'>
                <br />
                <br />
                <br />
                <Switch>
                    <Route path='/registration' exact component={ Registration } />
                    <Route path='/login' exact  component={ Login } />
                    <Route path='/logged' exact  component={ Logged } />
                    <Route path="/" component={ Login } />
                </Switch>
            </div>
        )
    }
}