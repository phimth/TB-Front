import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import LoginScreen from 'screens/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  useParams,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom'

import GameState from '../../models/GameState'

interface Props {
  login: (isCretor: boolean) => void
}

const Home: React.FC<Props> = (props) => {
  const history = useHistory()

  function create() {
    history.push('/login', true)
  }

  function join() {
    history.push('/login', false)
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
