import CardModel from 'models/CardModel'
import TypeModel from 'models/TypeModel'
import { Card } from 'react-bootstrap'

export class CardFactory implements CardModel {
  card_id: number
  type: string
  hidden: boolean

  constructor(id: number, type: string) {
    this.card_id = id
    this.type = type
    this.hidden = true
  }
}

export function createCard(id: number, type: string) {
  return new CardFactory(id, type)
}
