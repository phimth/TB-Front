import CardModel from 'models/CardModel'
import * as CardFactory from 'factory/Card'
import TypeModel from 'models/TypeModel'
import { Card } from 'react-bootstrap'

export class DeckFactory {
  number_of_cards: number
  cards: CardModel[]

  constructor(cables: number, defusers: number, bomb = 1) {
    this.number_of_cards = cables + defusers + bomb
    this.cards = this.buildDeck(this.number_of_cards, cables, defusers)
  }

  buildDeck(number: number, cables: number, defusers: number) {
    const cards: CardModel[] = []
    let index = 0
    for (let j = 0; j < cables; j++) {
      cards.push(CardFactory.createCard(index, 'cable'))
      index++
    }
    for (let k = 0; k < defusers; k++) {
      cards.push(CardFactory.createCard(index, 'defuser'))
      index++
    }
    cards.push(CardFactory.createCard(index, 'bomb'))
    return cards
  }
}

export function createDeck(cables: number, defusers: number, bomb = 1) {
  return new DeckFactory(cables, defusers, bomb)
}
