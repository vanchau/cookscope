import React, {useState} from 'react'
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

const App = () => {

  const [rating, setRating] = useState(0)

  return (
    <Router>
      <NavigationBar/>
      <div className='global-background'>
        <Container>
          <Switch>
            <Route exact path='/' render={(props) => <Home {...props} starEditing={false} rating={rating} setRating={setRating} />} />
            <Route path='/about' component={About} />
            <Route path='/create-recipe' component={CreateRecipe} />
            <Route path='/settings' component={Settings} />
            <Route path='/privacy' component={PrivacyPolicy} />
            <Route path='/terms' component={TermsOfService} />
            <Route exact path='/recipe/:recipeID' render={(props) => <Recipe {...props} starEditing={true} rating={rating} setRating={setRating} />} />
            <Route path='/user/:username' component={UserProfile}/>
          </Switch>
        </Container>
        <div style={{height:'10em', background:'transparent'}}></div>
      </div>
    </Router>
  )
}

export default App