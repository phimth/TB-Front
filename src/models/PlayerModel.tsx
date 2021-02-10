import CardModel from './CardModel'

interface PlayerModel {
  player_id: string
  role: string
  hand: CardModel[]
  announced: any[]
  username: string
}

export default PlayerModel
