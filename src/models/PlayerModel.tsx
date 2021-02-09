import CardModel from './CardModel'

interface PlayerModel {
  player_id: string
  role: string
  hand: CardModel[]
  announced: CardModel[]
}

export default PlayerModel
