import React, { useState, lazy, Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch, Route } from 'react-router-dom'

import GameStateModel from './models/GameStateModel'

const App = () => {
  const Home = lazy(() => import('./screens/Home'))
  const Game = lazy(() => import('./screens/Game'))
  const Lobby = lazy(() => import('./screens/Lobby'))
  //  const Lobby = lazy(() => Promise.resolve(require('./screens/Lobby')))
  const Login = lazy(() => import('./screens/Login'))
  const Join = lazy(() => import('./screens/Join'))
  const Create = lazy(() => import('./screens/Create'))
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
        <Route exact path="/login" component={Login} />
        <Route exact path="/join" component={Join} />
        <Route exact path="/create" component={Create} />
      </Suspense>
    </Switch>
  )
}

export default App
