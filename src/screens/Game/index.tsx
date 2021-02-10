//import GameModel from 'models/GameModel'
import UserModel from 'models/UserModel'
import GameModel from 'models/GameModel'
import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { auth, db } from 'services'
import PlayerModel from 'models/PlayerModel'
import PlayersList from './PlayersList'
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

  const loadGame = () => {
    gameDoc.onSnapshot((doc) => {
      doc.docChanges().forEach((change) => {
        const data: GameModel = change.doc.data() as GameModel
        const array: string[] = []
        const users = change.doc.data().players
        for (let j = 0; j < users.length; j++) {
          array.push(users[j])
        }
        setPlayerId(array)
        setGame(data)
      })
    })
  }

  const getPlayers = async (id: string) => {
    const playerRef = db.collection('Players').doc(id)
    const player = await playerRef.get()

    return player.data() as PlayerModel
  }

  const fetchPlayers = async () => {
    const array: PlayerModel[] = []
    for (let i = 0; i < playerId.length; i++) {
      const _player = await getPlayers(playerId[i])
      array.push(_player)
    }
    setPlayers(array)
  }

  const getSelf = async () => {
    const test = db.collection('Players').doc(user.id)
    const log = await test.get()
    setPlayer(log.data() as PlayerModel)
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
    auth.onAuthStateChanged((user) => {
      if (user) {
      } else {
        history.push('/login')
      }
    })
  }, [change])
  return (
    <Container fluid>
      <Row className="mt-5 ml-5">
        <PlayersList players={players} />
      </Row>
    </Container>
  )
}

export default GameScreen
