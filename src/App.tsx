import React, { useState, lazy, Suspense } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import GameStateModel from './models/GameStateModel'

const App = () => {
  const Home = lazy(() => import('./screens/Home'))
  const Game = lazy(() => import('./screens/Game'))
  const Lobby = lazy(() => import('./screens/Lobby'))
  //  const Lobby = lazy(() => Promise.resolve(require('./screens/Lobby')))
  const Login = lazy(() => import('./screens/Login'))

  const [state, setState] = useState(GameStateModel.Home)

  const [isCreator, setIsCreator] = useState(false)

  function login(isCreator: boolean) {
    setState(GameStateModel.Login)
    setIsCreator(isCreator)
  }

  function join() {
    setState(GameStateModel.Lobby)
  }
  function start() {
    setState(GameStateModel.Game)
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
