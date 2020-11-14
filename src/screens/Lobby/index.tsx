import React from 'react'
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'
interface Lobby {
  lobby_id: number
  players: []
  max_players: number
  host_id: number
}

const LobbyScreen = () => {
  const history = useHistory()
  const redirect = () => history.push('/game')

  function start() {
    redirect()
  }

  return (
    <div>
      <h1>Lobby</h1>
      <div>Liste</div>
      <Button variant="outline-secondary" size="lg" onClick={start}>
        Start
      </Button>
    </div>
  )
}

export default LobbyScreen
