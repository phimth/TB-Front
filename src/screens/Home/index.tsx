import React from 'react'
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'

import Lobby from '../Lobby'

const Home = () => {
  const history = useHistory()
  const handleClick = () => history.push('/lobby')

  return (
    <Router>
      <div>
        <Button variant="outline-secondary" size="lg" onClick={handleClick}>
          Create a game
        </Button>
        <Button variant="outline-secondary" size="lg" onClick={handleClick}>
          Join a game
        </Button>
      </div>
    </Router>
  )
}

export default Home
