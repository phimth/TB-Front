import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
  useParams,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { db, database } from '../../services'

interface Props {
  isCreator: boolean
  join: () => void
}

const JoinScreen: React.FC<Props> = (props) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const [name, setName] = useState('')

  const [code, setCode] = useState('')

  const [gameStarted, setGameStarted] = useState(false)

  const history = useHistory()

  const [validated, setValidated] = React.useState(false)

  const handleSubmit = (e: {
    currentTarget: any
    preventDefault: () => void
    stopPropagation: () => void
  }) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      runJoin()
    }
    e.preventDefault()
    setValidated(true)
  }

  const createUser = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: name }),
    }
    let r = await fetch(serverUrl + 'users/', requestOptions)

    let data = await r.json()
    return data
  }

  const joinLobby = async (id: number) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: id }),
    }

    let r = await fetch(serverUrl + 'lobby/' + code + '/users', requestOptions)
    let data = await r.json()
    return data
  }

  const runJoin = async () => {
    try {
      const data = await createUser()
      const lobby = await joinLobby(data.id)
      var isActive
      db.collection('games')
        .where('game_id', '==', lobby.game[0])
        .onSnapshot((doc) => {
          doc.docChanges().forEach((change) => {
            isActive = change.doc.data().is_game_started
            if (!isActive) {
              setGameStarted(false)
              history.push('lobby/' + lobby.id, {
                isCreator: false,
                user: data,
                lobby: lobby,
              })
            } else {
              setGameStarted(true)
            }
          })
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Row className="justify-content-center">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="nameId">
          <Form.Control
            required
            type="text"
            placeholder="Pseudo"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Veuillez entrer votre pseudo.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="codeId">
          <Form.Control
            required
            type="text"
            placeholder="Code du Lobby"
            onChange={(e) => setCode(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Veuillez entrer un code de lobby.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="outline-secondary" type="submit">
          Join game
        </Button>
        {gameStarted && (
          <Row className="justify-content-center">
            This game had already started.
          </Row>
        )}
      </Form>
    </Row>
  )
}

export default JoinScreen
