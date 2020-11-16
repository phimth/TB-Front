import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image'
import LoginScreen from 'screens/Login'

import GameState from '../../models/GameState'

interface Props {
  login: (isCretor: boolean) => void
}

const Home: React.FC<Props> = (props) => {
  function create() {
    props.login(true)
  }

  function join() {
    props.login(false)
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
