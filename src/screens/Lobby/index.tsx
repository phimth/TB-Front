import React from 'react'
import Button from 'react-bootstrap/Button'

interface Lobby {
  lobby_id: number
  players: []
  max_players: number
  host_id: number
}

class LobbyScreen extends React.Component {
  render() {
    return (
      <div>
        <h1>Lobby</h1>
        <div>Liste</div>
      </div>
    )
  }
}

export default LobbyScreen
