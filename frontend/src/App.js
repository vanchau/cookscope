import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import './css/App.css'
import Settings from './components/Settings'
import NavigationBar from './components/NavigationBar'
import CreateRecipe from './components/CreateRecipe'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/Terms'
import Recipe from './components/Recipe'
import Home from './components/Home'
import UserProfile from './components/UserProfile'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const App = () => (
  <Router>
    <NavigationBar/>
    <div className='global-background'>
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/create-recipe' component={CreateRecipe} />
          <Route path='/settings' component={Settings} />
          <Route path='/privacy' component={PrivacyPolicy} />
          <Route path='/terms' component={TermsOfService} />
          <Route path='/recipe/:recipeID' component={Recipe}/>
          <Route path='/user/:username' component={UserProfile}/>
        </Switch>
      </Container>
      <div style={{height:'10em', background:'transparent'}}></div>
    </div>
  </Router>
)

export default App