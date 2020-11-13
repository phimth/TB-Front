import React from 'react'

interface Game {
  game_id: number
  number_players: number
  number_cables_discovered: number
  round_number: number
  bomb_discovered: boolean
  player_turn_id: number
  deck: []
  winners: []
  lobby_id: number
}

class GameScreen extends React.Component {
  render() {
    return <div>Game</div>
  }
}

export default GameScreen
