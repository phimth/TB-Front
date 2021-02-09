import CardModel from 'models/CardModel'
import * as DeckFactory from 'factory/Deck'
import PlayerModel from 'models/PlayerModel'
import * as PlayerFactory from 'factory/Player'

export class GameFactory {
  number_players: number
  player_turn_id: string
  players: PlayerModel[]
  deck: CardModel[]
  // winners: [number]

  constructor(number_players: number, userId: string[]) {
    this.number_players = number_players
    this.player_turn_id = this.pickPlayer(userId, 'start')
    this.players = this.createRoles(userId)
    this.deck = this.initializeDeck(number_players)
    this.distribute(this.deck, userId)
  }

  initializeDeck(number: number) {
    let deck: CardModel[] = []
    if (number == 1) {
      deck = DeckFactory.createDeck(5, 2).cards
    }
    if (number == 2) {
      deck = DeckFactory.createDeck(9, 3).cards
    }
    if (number == 4) {
      deck = DeckFactory.createDeck(15, 4).cards
    }
    if (number == 5) {
      deck = DeckFactory.createDeck(19, 5).cards
    }
    if (number == 6) {
      deck = DeckFactory.createDeck(23, 6).cards
    }
    if (number == 7) {
      deck = DeckFactory.createDeck(27, 7).cards
    }
    if (number == 8) {
      deck = DeckFactory.createDeck(31, 8).cards
    }
    this.shuffleArray(deck)
    return deck
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  pickPlayer(players: string[], id: string) {
    if (id == 'start') {
      return players[Math.floor(Math.random() * players.length)]
    } else {
      return id
    }
  }

  distribute(deck: CardModel[], players: string[]) {}

  createRoles(players: string[]) {
    const roles: PlayerModel[] = []
    const role: string[] = []
    let nb_sherlock = 0
    let nb_moriarty = 0
    if (players.length == 1) {
      nb_sherlock = 1
    }
    if (players.length == 2) {
      nb_sherlock = 1
      nb_moriarty = 1
    }
    if (players.length == 4) {
      nb_moriarty = 2
      nb_sherlock = 3
    }
    if (players.length == 5) {
      nb_moriarty = 2
      nb_sherlock = 3
    }
    if (players.length == 6) {
      nb_moriarty = 2
      nb_sherlock = 4
    }
    if (players.length == 7) {
      nb_moriarty = 3
      nb_sherlock = 5
    }
    if (players.length == 8) {
      nb_moriarty = 3
      nb_sherlock = 5
    }
    for (let i = 0; i < nb_sherlock; i++) {
      role.push('sherlock')
    }
    for (let j = 0; j < nb_moriarty; j++) {
      role.push('moriarty')
    }
    this.shuffleArray(role)
    const zip = (a: string | any[], b: string | any[]) =>
      Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]])
    const arrayZip = zip(players, role)
    for (let k = 0; k < arrayZip.length; k++) {
      if (arrayZip[k][0] != undefined)
        roles.push(PlayerFactory.createPlayer(arrayZip[k][0], arrayZip[k][1]))
    }
    return roles
  }
}

export function createGame(number: number, userId: string[]) {
  return new GameFactory(number, userId)
}
