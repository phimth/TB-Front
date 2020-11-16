import React, { useState, lazy, Suspense } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Home from './screens/Home'
import LobbyScreen from './screens/Lobby'
import GameScreen from './screens/Game'
import LoginScreen from './screens/Login'
import GameState from './models/GameState'

const App = () => {
  const Home = lazy(() => import('./screens/Home'))
  const Game = lazy(() => import('./screens/Game'))
  const Lobby = lazy(() => import('./screens/Lobby'))
  const Login = lazy(() => import('./screens/Login'))

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
    <Switch>
      <Suspense fallback={<p>Loading page</p>}>
        <Route path="/lobby/:id" component={Lobby} />
        <Route exact path="/" component={Home} />
        <Route path="/game/:id" component={Game} />
        <Route path="/login" component={Login} />
      </Suspense>
    </Switch>
  )
}

export default App
