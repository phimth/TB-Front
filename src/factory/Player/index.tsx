import CardModel from 'models/CardModel'
import PlayerModel from 'models/PlayerModel'

export class PlayerFactory implements PlayerModel {
  player_id: string
  role: string
  hand: CardModel[]
  announced: any[]

  username: string

  constructor(id: string, role: string) {
    this.player_id = id
    this.role = role
    this.hand = []
    this.announced = [{ bomb: false }, { defusers: 0 }]
    this.username = ''
  }
}

export function createPlayer(id: string, role: string) {
  return new PlayerFactory(id, role)
}
