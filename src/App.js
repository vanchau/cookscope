import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import { Settings } from './components/Settings'
import { NavigationBar } from './components/NavigationBar';
// import { Layout } from './components/Layout';
import { CreateRecipe } from './components/CreateRecipe';
import { CategoryList } from './components/CategoryList';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import Main from './components/Main';
import { TermsOfService } from './components/Terms';
import Recipe from './components/Recipe'

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <div style={{ backgroundColor: '#f7f5ef' }}>
          <Container style={{ maxWidth: '900px', backgroundColor: 'white' }} >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/create-recipe" component={CreateRecipe} />
              <Route path="/settings" component={Settings} />
              <Route path="/privacy" component={PrivacyPolicy} />
              <Route path="/terms" component={TermsOfService} />
              <Route path="/recipe/:recipeID" component={Recipe}/>
            </Switch>
          </Container>
        </div>
      </Router>
    </React.Fragment>
  );
}

const Home = () => (
  <div style={{ width: '930px',display: 'flex', backgroundColor: 'white'}}>
    <CategoryList />
    <Main />
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

export default App;
