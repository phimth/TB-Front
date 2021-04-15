import CardModel from 'models/CardModel'
import PlayerModel from 'models/PlayerModel'

export function DistributeCards(
  deck: CardModel[],
  players: PlayerModel[],
  round: number
) {
  shuffleArray(deck)
  for (let i = 0; i < players.length; i++) {
    players[i].hand = [] //effacer possible ancienne main
    for (let j = 0; j < 5 - round + 1; j++) {
      players[i].hand.push(deck.pop() as CardModel)
    }
  }
  return { deck, players }
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
