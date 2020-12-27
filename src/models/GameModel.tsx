import CardModel from './CardModel'

interface IGame {
  //game_id: number
  number_players: number
  number_cables_discovered: number
  round_number: number
  bomb_discovered: boolean
  player_turn_id: string
  deck: CardModel[]
  winners: []
  lobby_id: string
}

// class GameModel implements IGame {
//   constructor() {}
//   number_players: number
//   number_cables_discovered: number
//   round_number: number
//   bomb_discovered: boolean
//   player_turn_id: number
//   deck: CardModel[]
//   winners
//   lobby_id: number
// }

// export default GameModel
