import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation
} from 'react-router-dom'

const Home = () => {
  const history = useHistory()

  function create() {
    history.push('/login',true)
  }

  function join() {
    history.push('/login',false)
  }

  return (
    <div className="">
      <Row className="justify-content-center">
        <Button variant="outline-secondary" size="lg" onClick={create}>
          Create a game
        </Button>
      </Row>
      <Row className="justify-content-center">
        <Button variant="outline-secondary" size="lg" onClick={join}>
          Join a game 
        </Button>
      </Row>
    </div>
  )
}

export default Home
