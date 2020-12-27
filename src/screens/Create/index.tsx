import React, { useState, useEffect } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
  useParams,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom'
import UserModel from '../../models/UserModel'
import useCreateUser from '../../hooks/use-create-user'
import { auth, db } from '../../services/index'
import { create } from 'domain'

const CreateScreen: React.FC = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const [numberPlayers, setNumberPlayers] = useState<string>('4')
  const [host, setHost] = useState<UserModel>()
  const [change, setChange] = useState(false)

  const history = useHistory()

  const [validated, setValidated] = React.useState(false)

  const handleSubmit = (e: {
    currentTarget: any
    preventDefault: () => void
    stopPropagation: () => void
  }) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      //runCreate()
      create()
    }
    e.preventDefault()
    //setValidated(true)
  }

  const createUser = async () => {
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username: name }),
    // }
    // let r = await fetch(serverUrl + 'users/', requestOptions)
    // let data = await r.json()
    // return data
  }

  const createLobby = async (id: number) => {
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ host: id }),
    // }
    // let r = await fetch(serverUrl + 'lobby-management/', requestOptions)
    // let data = await r.json()
    // return data
  }

  const runCreate = async () => {
    // try {
    //   const data = await createUser()
    //   const lobby = await createLobby(data.id)
    //   history.push('lobby/' + lobby.id, {
    //     isCreator: true,
    //     user: data,
    //     lobby: lobby,
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const create = async () => {
    const player = await db.collection('Players').add({
      id: host?.id.slice(0, 6),
      username: host?.username,
    })

    const res = await db.collection('Lobbys').add({
      host_id: host?.id,
      users: [player.id],
      max_players: numberPlayers,
    })

    const code = res.id.slice(0, 6).toUpperCase()

    const game = await db.collection('Games').add({
      is_game_started: false,
      game_id: code,
    })

    await db
      .collection('Lobbys')
      .doc(res.id)
      .update({ lobby_id: code, games: [game.id] })

    history.push('/lobby/' + res.id, {
      isCreator: true,
      code: code,
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setHost({ id: user.uid, username: user.displayName })
      } else {
        history.push('/login')
      }
    })
  }, [change])

  return (
    <Row className="justify-content-center">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Number of players max</Form.Label>
          <Form.Control
            as="select"
            defaultValue="4"
            onChange={(e) => setNumberPlayers(e.target.value)}
          >
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </Form.Control>
        </Form.Group>

        <Button variant="outline-secondary" type="submit">
          Create game
        </Button>
      </Form>
    </Row>
  )
}

export default CreateScreen
