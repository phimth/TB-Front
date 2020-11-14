import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'

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
    return <Row className="justify-content-center">c Game</Row>
  }
}

export default GameScreen
