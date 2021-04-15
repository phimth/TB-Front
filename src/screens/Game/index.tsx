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
    GameStateModel.Start
  )
  const [empty, setEmpty] = useState<boolean>(true)

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

  const startRound = async () => {
    switch (gameState) {
      case GameStateModel.Checkwin:
        if (game)
          if (game.deck.length > 1) setGameState(GameStateModel.Distribute)
        break
      case GameStateModel.Distribute:
        await distribute()
        break
      case GameStateModel.Memorize:
        break
      case GameStateModel.Hide:
        break
      case GameStateModel.Declaration:
        break
      case GameStateModel.Cut:
        break
    }
  }

  const distribute = async () => {
    if (game) {
      if (game.deck.length > 1) {
        const result = DistributeCards(game.deck, players, game.round_number)
        db.collection('Games').doc(id).update({
          deck: result.deck,
        })
        for (let i = 0; i < result.players.length; i++) {
          db.collection('Players').doc(result.players[i].id).update({
            hand: result.players[i].hand,
          })
        }
      }
    }
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
    if (empty && players.length > 1) createDeck(playerId)
  }, [empty, players])

  useEffect(() => {
    if (game && !empty) {
      if (isCreator) {
        startRound()
      }
    }
  }, [game])

  useEffect(() => {}, [players])

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
        <PlayersList players={players} id={player?.id} />
      </Row>
      {user.id == turn?.id ? <Button></Button> : null}
    </Container>
  )
}

export default GameScreen
