import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'

interface Lobby {
  lobby_id: number
  players: []
  max_players: number
  host_id: number
}

const LobbyScreen = () => {
  const history = useHistory()
  const redirect = () => history.push('/game')

  function start() {
    redirect()
  }

  return (
    <Col>
      <Row className="justify-content-center">
        Liste
      </Row>
      <Row className="justify-content-center">
        <Button variant="outline-secondary" onClick={start}>
          Start
      </Button>
      </Row>
    </Col>
  )
}

export default LobbyScreen
