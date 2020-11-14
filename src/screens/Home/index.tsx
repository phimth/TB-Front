import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'

const Home = () => {
  const history = useHistory()
  const redirect = () => history.push('/login')

  function create() {
    redirect()
  }

  function join() {
    redirect()
  }

  return (
    <Col>
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
    </Col>
  )
}

export default Home
