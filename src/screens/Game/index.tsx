//import GameModel from 'models/GameModel'
import UserModel from 'models/UserModel'
import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { auth, db } from 'services'
interface Params {
  id: string
}

interface ILocation {
  isCreator: boolean
  code: string
}
const GameScreen: React.FC = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const game_engine = process.env.REACT_APP_GAME_ENGINE
  const [change, setChange] = useState(false)
  const history = useHistory()
  const location = useLocation<ILocation>().state
  const isCreator = location.isCreator
  const code = location.code
  const gameDoc = db.collection('games').where('game_id', '==', code)
  // const [game, setGame] = useState<GameModel>()

  // const runGame = () => {
  //   gameDoc.onSnapshot((doc) => {
  //     doc.docChanges().forEach((change) => {
  //       let data: GameModel = change.doc.data() as GameModel
  //       setGame(data)
  //     })
  //   })
  // }

  useEffect(() => {
    let isActive = true
    // runGame()
    return () => {
      isActive = false
    }
  })

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
      } else {
        history.push('/login')
      }
    })
  }, [change])
  return <Row className="justify-content-center">c Game</Row>
}

export default GameScreen
