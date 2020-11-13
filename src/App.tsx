import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Home from './screens/Home'
import LobbyScreen from './screens/Lobby'
import GameScreen from './screens/Game'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/lobby" component={LobbyScreen} />
          <Route path="/game" component={GameScreen} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
