//import GameModel from 'models/GameModel'
import UserModel from 'models/UserModel'
import GameModel from 'models/GameModel'
import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { auth, db } from 'services'
import PlayerModel from 'models/PlayerModel'
import PlayersList from './PlayersList'
import { DistributeCards } from 'engine/distribute'
import GameStateModel from 'models/GameStateModel'
import CardModel from 'models/CardModel'
import * as GameFactory from 'factory/Game'
interface Params {
  id: string
}

interface ILocation {
  isCreator: boolean
  code: string
  user: UserModel
}
const GameScreen: React.FC = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const game_engine = process.env.REACT_APP_GAME_ENGINE
  const [change, setChange] = useState(false)
  const id = useParams<Params>().id
  const history = useHistory()
  const location = useLocation<ILocation>().state
  const isCreator = location.isCreator
  const code = location.code
  const user = location.user
  const [players, setPlayers] = useState<PlayerModel[]>([])
  const [playerId, setPlayerId] = useState<string[]>([])
  const gameDoc = db.collection('Games').where('game_id', '==', code)
  const [game, setGame] = useState<GameModel>()
  const [player, setPlayer] = useState<PlayerModel>()
  const [turn, setTurn] = useState<PlayerModel>()
  const [isOver, setIsOver] = useState<boolean>(false)
  const [gameState, setGameState] = useState<GameStateModel>(
    GameStateModel.Init
  )
  const [empty, setEmpty] = useState<boolean>(true)
  const [selected, setSelected] = useState<CardModel>()
  const [clickable, setClickable] = useState<boolean>(false)

  const loadGame = async () => {
    gameDoc.onSnapshot((doc) => {
      doc.docChanges().forEach((change) => {
        const data: GameModel = change.doc.data() as GameModel
        const array: string[] = []
        const users = change.doc.data().players
        for (let j = 0; j < users.length; j++) {
          array.push(users[j])
        }
        getTurnPlayer(data.player_turn_id)
        setPlayerId(array)
        setGame(data)
        setIsOver(data.is_game_over)
      })
    })
  }

  const getTurnPlayer = async (id: string) => {
    setTurn(await getPlayer(id))
  }

  const createDeck = async (playersList: string[]) => {
    const start = GameFactory.createGame(playersList.length, playersList)
    const array = start.deck.map((obj) => {
      return Object.assign({}, obj)
    })
    db.collection('Games').doc(id).update({
      deck: array,
    })
    setGameState(GameStateModel.Checkwin)
    setEmpty(false)
  }

  const getPlayer = async (id: string) => {
    const playerRef = db.collection('Players').doc(id)
    const player = await playerRef.get()

    return player.data() as PlayerModel
  }

  // const fetchPlayers = () => { // to implement
  //   db.collection('Players')
  //     .where('id', 'in', [
  //       'J50Ja4BQQAYp2HMQVYVVtoMWC8j1',
  //       'xXPLGxBh4hgIhhEnUd1cdGSTQrX2',
  //     ])
  //     .onSnapshot((doc) => {
  //       const array: PlayerModel[] = []
  //       doc.docChanges().forEach((change) => {
  //         const data = change.doc.data()
  //         console.log(data)
  //         array.push(data as PlayerModel)
  //       })
  //       setPlayers(array)
  //     })
  // }

  const fetchPlayers = async () => {
    const array: PlayerModel[] = []
    for (let i = 0; i < playerId.length; i++) {
      const _player = await getPlayer(playerId[i])
      array.push(_player)
    }
    setPlayers(array)
  }

  const getSelf = async () => {
    const playerRef = db.collection('Players').doc(user.id)
    const player = await playerRef.get()
    setPlayer(player.data() as PlayerModel)
  }

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  const hideAll = async () => {
    if (isCreator) {
      for (let i = 0; i < players.length; i++) {
        shuffleArray(players[i].hand)
        for (let j = 0; j < players[i].hand.length; j++) {
          players[i].hand[j].hidden = true
        }
        await db.collection('Players').doc(players[i].id).update({
          hand: players[i].hand,
        })
      }
    }
    await fetchPlayers()
    setGameState(GameStateModel.Declaration)
  }

  const distribute = async () => {
    if (game) {
      if (game.deck.length > 1) {
        const result = DistributeCards(game.deck, players, game.round_number)
        if (isCreator) {
          db.collection('Games').doc(id).update({
            deck: result.deck,
          })
          for (let i = 0; i < result.players.length; i++) {
            db.collection('Players').doc(result.players[i].id).update({
              hand: result.players[i].hand,
            })
          }
        }
        setGameState(GameStateModel.Memorize)
      }
    }
  }

  const memorize = async () => {
    setTimeout(() => {
      setGameState(GameStateModel.Hide)
    }, 5000)
  }

  const declaration = async () => {
    setGameState(GameStateModel.Cut)
  }

  const cut = async () => {
    //setGameState(GameStateModel.Checkwin)
    if (selected == null) {
      console.log('erreur choissisez un cable a couper')
    } else {
      console.log(selected)
    }
  }

  const select = (_card: CardModel, _player: PlayerModel) => {
    console.log(_player)
    setSelected(_card)
  }

  const checkWin = () => {
    setGameState(GameStateModel.Distribute)
  }

  useEffect(() => {
    let isActive = true
    loadGame()
    getSelf()
    return () => {
      isActive = false
    }
  }, [location])

  useEffect(() => {
    fetchPlayers()
  }, [playerId])

  useEffect(() => {
    if (empty && players.length > 1 && player) createDeck(playerId)
  }, [empty, players, player])

  useEffect(() => {
    if (game && !empty) {
      if (gameState == GameStateModel.Checkwin) {
        setClickable(false)
        if (game.deck) if (game.deck.length > 1) checkWin()
      } else if (gameState == GameStateModel.Distribute) {
        distribute()
      } else if (gameState == GameStateModel.Memorize) {
        memorize()
      } else if (gameState == GameStateModel.Hide) {
        hideAll()
      } else if (gameState == GameStateModel.Declaration) {
        declaration()
      } else if (gameState == GameStateModel.Cut) {
        setClickable(true)
      }
    }
  }, [game, gameState])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
      } else {
        history.push('/login')
      }
    })
  }, [change])
  return (
    <Container fluid>
      {turn && (
        <Row className="mt-2 justify-content-center">
          It's {turn.username}'s turn
        </Row>
      )}

      <Row className="mt-5 ml-5">
        <PlayersList
          players={players}
          id={player?.id}
          select={(_card: CardModel, _player: PlayerModel) =>
            select(_card, _player)
          }
          clickable={clickable}
        />
      </Row>
      {user.id == turn?.id ? <Button onClick={() => cut()}>Cut</Button> : null}
    </Container>
  )
}

export default GameScreen
