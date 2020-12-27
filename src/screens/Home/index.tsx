import React, { FC, useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import LoginScreen from 'screens/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  useParams,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { auth } from '../../services/index'
import GameStateModel from '../../models/GameStateModel'

const Home: FC = () => {
  const [isLogged, setIsLogged] = useState(false)

  const history = useHistory()

  function create() {
    history.push('/create')
  }

  function join() {
    history.push('/join')
  }

  function login() {
    history.push('/login')
  }

  function signup() {
    history.push('/signup')
  }

  function logout() {
    auth
      .signOut()
      .then(() => {
        setIsLogged(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogged(true)
      }
    })
  }, [isLogged])

  return isLogged ? (
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
      <Row className="justify-content-center">
        <Button variant="outline-secondary" size="lg" onClick={logout}>
          Log out
        </Button>
      </Row>
    </div>
  ) : (
    <div className="">
      <Row className="justify-content-center">
        <Button variant="outline-secondary" size="lg" onClick={login}>
          Login
        </Button>
      </Row>
      <Row className="justify-content-center">
        <Button variant="outline-secondary" size="lg" onClick={signup}>
          Sign up
        </Button>
      </Row>
    </div>
  )
}

export default Home
