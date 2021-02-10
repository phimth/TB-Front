import CardModel from './CardModel'
import PlayerModel from './PlayerModel'

interface GameModel {
  game_id: string
  number_players: number
  number_cables_discovered: number
  round_number: number
  is_bomb_discovered: boolean
  is_game_over: boolean
  player_turn_id: string
  deck: CardModel[]
  winners: []
  players: PlayerModel[]
  lobby_id: string
}

// class GameModel implements IGame {
//   number_players: number
//   number_cables_discovered: number
//   round_number: number
//   bomb_discovered: boolean
//   player_turn_id: number
//   deck: CardModel[]
//   winners
//   lobby_id: number
// }

export default GameModel
