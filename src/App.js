import React, { Component } from "react";
import { BrowserRouter , Switch, Route } from 'react-router-dom'
import "./App.css";
import FormDataComponent from './components/Login';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path ="/" component={FormDataComponent}/>
        <Route path="/signUp" component={SignUp}/>
        <Route path="/profile" component={Welcome}/>
      </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
