import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './screens/Home'
import LobbyScreen from './screens/Lobby'
import GameScreen from './screens/Game'
import LoginScreen from './screens/Login'
import GameState from './models/GameState'

const App = () => {
  const [state, setState] = useState(GameState.Home)

  const [isCreator, setIsCreator] = useState(false)

  function login(isCreator: boolean) {
    setState(GameState.Login)
    setIsCreator(isCreator)
  }

  function join() {
    setState(GameState.Lobby)
  }
  function start() {
    setState(GameState.Game)
  }
  return (
    <Container fluid>
      {state == GameState.Home ? <Home login={login} /> : null}
      {state == GameState.Login ? (
        <LoginScreen isCreator={isCreator} join={join} />
      ) : null}
      {state == GameState.Lobby ? (
        <LobbyScreen start={start} isCreator={isCreator} />
      ) : null}
      {state == GameState.Game ? <GameScreen /> : null}
    </Container>
  )
}

export default App
