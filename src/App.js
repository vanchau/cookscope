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
import { Main } from './components/Main';
import { TermsOfService } from './components/Terms';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <hr style={{
            borderColor: '#E75B00',
            height: '20px',
            marginTop: '0px'
        }}/>
        <Container>
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
            <Route path="/privacy">
              <PrivacyPolicy />
            </Route>
            <Route path="/terms">
              <TermsOfService />
            </Route>
          </Switch>
        </Container>

      </Router>
    </React.Fragment>
  );
}

const Home = () => (
  <div style={{ display: 'flex' }}>
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
