import CardModel from './CardModel'

interface PlayerModel {
  id: string
  role: string
  hand: CardModel[]
  announced: { defusers: number; bomb: boolean }
  username: string
}

export default PlayerModel
