import UserModel from 'models/UserModel'
import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col, Navbar } from 'react-bootstrap'
import {
  useParams,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { db, data, auth } from '../../services'
import firebase from 'firebase'

interface Props {
  isCreator: boolean
  join: () => void
}

const JoinScreen: React.FC<Props> = (props) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const [name, setName] = useState('')

  const [user, setUser] = useState<UserModel>()

  const [code, setCode] = useState('')

  const [lobby, setLobby] = useState('')

  const [gameStarted, setGameStarted] = useState(false)

  const history = useHistory()

  const [validated, setValidated] = React.useState(false)

  const [change, setChange] = useState(false)

  const handleSubmit = (e: {
    currentTarget: any
    preventDefault: () => void
    stopPropagation: () => void
  }) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      //runJoin()
      join()
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
    const r = await fetch(serverUrl + 'users/', requestOptions)

    const data = await r.json()
    return data
  }

  const joinLobby = async (id: number) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: id }),
    }

    const r = await fetch(
      serverUrl + 'lobby/' + code + '/users',
      requestOptions
    )
    const data = await r.json()
    return data
  }

  const runJoin = async () => {
    try {
      const data = await createUser()
      const lobby = await joinLobby(data.id)
      let isActive
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

  const join = async () => {
    let isActive
    db.collection('Games')
      .where('game_id', '==', code)
      .onSnapshot((doc) => {
        doc.docChanges().forEach((change) => {
          isActive = change.doc.data().is_game_started
          if (!isActive) {
            addLobby()
          } else {
            //error
          }
        })
      })
  }

  const addLobby = async () => {
    await db
      .collection('Lobbys')
      .where('lobby_id', '==', code)
      .onSnapshot((doc) => {
        doc.docChanges().forEach((change) => {
          setLobby(change.doc.id)
        })
      })
  }

  const canJoin = async () => {
    // const player = await db.collection('Players').add({
    //   id: user?.id,
    //   username: user?.username,
    // })

    await db
      .collection('Lobbys')
      .doc(lobby)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(user?.id),
      })

    history.push('/lobby/' + lobby, {
      isCreator: false,
      code: code,
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ id: user.uid, username: user.displayName })
      } else {
        history.push('/login')
      }
    })
  }, [change])

  useEffect(() => {
    if (!(lobby === '')) {
      canJoin()
    }
  }, [lobby])

  useEffect(() => {
    let isActive = true
    return () => {
      isActive = false
    }
  }, [change])

  return (
    <div className="">
      <Navbar className="justify-content-center">
        <Button
          variant="outline-dark"
          size="lg"
          onClick={() => history.push('/')}
        >
          TimeBomb
        </Button>
        <Navbar.Text className="justify-content-end">
          Hi {user?.username}
        </Navbar.Text>
      </Navbar>
      <Row className="justify-content-center">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
    </div>
  )
}

export default JoinScreen
