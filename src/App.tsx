import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './screens/Home'
import LobbyScreen from './screens/Lobby'
import GameScreen from './screens/Game'
import LoginScreen from './screens/Login'

//{process.env.REACT_APP_FIREBASE_API_KEY}

const App = () => {
  return (
    <Container fluid>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/lobby" component={LobbyScreen} />
          <Route path="/game" component={GameScreen} />
          <Route path="/login" component={LoginScreen} />
        </Switch>
      </Router>
    </Container>

  )
}

export default App
