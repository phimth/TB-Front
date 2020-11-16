import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const Home = lazy(() => import('../screens/Home'))
const Game = lazy(() => import('../screens/Game'))
const Lobby = lazy(() => import('../screens/Lobby'))
const Login = lazy(() => import('../screens/Login'))
const App = lazy(() => import('../App'))
const Routes = () => {
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

export default Routes
