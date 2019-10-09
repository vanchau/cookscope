import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Settings } from './components/settings'
import { NavigationBar } from './components/NavigationBar';
import { Layout } from './components/Layout';
import { CreateRecipe } from './components/CreateRecipe';


const App = () => {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <hr />
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/createrecipe">
              <CreateRecipe />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </React.Fragment>
  );
}

const Home = () => (
    <div>
      <h1>Home</h1>
    </div>
  )

const About = () => (
    <div>
      <h2>About</h2>
    </div>
  )

export default App;
