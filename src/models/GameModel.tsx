import CardModel from './CardModel'

interface GameModel {
  game_id: number
  number_players: number
  number_cables_discovered: number
  round_number: number
  bomb_discovered: boolean
  player_turn_id: number
  deck: CardModel[]
  winners: []
  lobby_id: number
}

export default GameModel
