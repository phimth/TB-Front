import React from 'react'
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'

const Home = () => {
  const history = useHistory()
  const redirect = () => history.push('/lobby')

  function create() {
    redirect()
  }

  function join() {
    redirect()
  }

  return (
    <Router>
      <div>
        <Button variant="outline-secondary" size="lg" onClick={create}>
          Create a game
        </Button>
        <Button variant="outline-secondary" size="lg" onClick={join}>
          Join a game
        </Button>
      </div>
    </Router>
  )
}

export default Home
