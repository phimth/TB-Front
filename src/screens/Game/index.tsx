import GameModel from 'models/GameModel'
import UserModel from 'models/UserModel'
import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useParams, useLocation } from 'react-router-dom'
import { db } from 'services'
interface Params {
  id: string
}

interface ILocation {
  user: UserModel
  gameDoc: string
}
const GameScreen: React.FC = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const game_engine = process.env.REACT_APP_GAME_ENGINE
  const id = useParams<Params>().id
  const game_id: number = +id
  const location = useLocation<ILocation>().state
  const gameDoc = db.collection('games').where('game_id', '==', game_id)
  const [game, setGame] = useState<GameModel>()

  const runGame = () => {
    gameDoc.onSnapshot((doc) => {
      doc.docChanges().forEach((change) => {
        let data: GameModel = change.doc.data() as GameModel
        setGame(data)
      })
    })
  }

  useEffect(() => {
    let isActive = true
    runGame()
    return () => {
      isActive = false
    }
  }, [id])
  useEffect(() => {
    console.log(game)
  }, [game])
  return <Row className="justify-content-center">c Game</Row>
}

export default GameScreen
