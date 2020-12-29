import React, { FC, useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col, Navbar } from 'react-bootstrap'
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
import UserModel from 'models/UserModel'

const Home: FC = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [user, setUser] = useState<UserModel>()

  const history = useHistory()

  function redirect(link: string) {
    history.push('/' + link)
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

  function home() {
    history.push('/')
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ id: user.uid, username: user.displayName })
        setIsLogged(true)
      }
    })
  }, [isLogged])

  return isLogged ? (
    <div className="">
      <Navbar className="justify-content-center">
        <Button variant="outline-dark" size="lg" onClick={home}>
          TimeBomb
        </Button>
        <Navbar.Text className="justify-content-end">
          Hi {user?.username}
        </Navbar.Text>
      </Navbar>

      <Row className="justify-content-center">
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => redirect('create')}
        >
          Create a game
        </Button>
      </Row>
      <Row className="justify-content-center">
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => redirect('join')}
        >
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
      <Navbar className="justify-content-center">
        <Button variant="outline-dark" size="lg" onClick={home}>
          TimeBomb
        </Button>
      </Navbar>
      <Row className="justify-content-center">
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => redirect('login')}
        >
          Login
        </Button>
      </Row>
      <Row className="justify-content-center">
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => redirect('signup')}
        >
          Sign up
        </Button>
      </Row>
    </div>
  )
}

export default Home
