import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
  useParams,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom'
import UsersList from './UsersList'
import UserModel from '../../models/UserModel'
//import LobbyModel from '../../models/LobbyModel'
import useTodos from '../../hooks/useTodos'
import { db, database, auth } from '../../services'
import { cleanup } from '@testing-library/react'
import firebase from 'firebase'

interface Params {
  id: string
}

interface ILocation {
  isCreator: boolean
  code: string
}
const LobbyScreen: React.FC = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const id = useParams<Params>().id
  const location = useLocation<ILocation>().state
  var isCreator = location.isCreator
  var code = location.code
  const history = useHistory()
  const lobby = db.collection('Lobbys').where('lobby_id', '==', code)
  const game = db.collection('Games').where('game_id', '==', code)

  const [change, setChange] = useState(false)

  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [userId, setUserId] = useState<string[]>([])
  const [gameId, setGameId] = useState<string>()
  const [lobbyId, setLobbyId] = useState<string>()
  const [users, setUsers] = useState<UserModel[]>([])
  const redirect = () => history.push('/game/' + gameId)

  const getLobby = () => {
    // to export
    // let r = await fetch(serverUrl + 'lobby/' + id + '/users') //serverUrl+id
    //.then((response) => response.json())
    //.then((data) => setTodos(data))
    // let lobby = await r.json()
    // let list = lobby[0].users
    //if (list.length == 0) history.push('/join') // gérer tous les cas d'erreur
    lobby.onSnapshot((doc) => {
      doc.docChanges().forEach((change) => {
        let array: string[] = []
        const users = change.doc.data().users
        for (let j = 0; j < users.length; j++) {
          array.push(users[j])
        }
        setLobbyId(change.doc.id)
        setUserId(array)
      })
    })
    game.onSnapshot((doc) => {
      doc.docChanges().forEach((change) => {
        const data = change.doc.data()
        setGameId(change.doc.id)
        setGameStarted(data.is_game_started)
      })
    })
  }

  const fetchtUsers = async () => {
    let array: UserModel[] = []
    for (let i = 0; i < userId.length; i++) {
      let _user = await getUsers(userId[i])
      array.push(_user)
    }
    setUsers(array)
  }

  const getUsers = async (_id: string) => {
    const playerRef = db.collection('Players').doc(_id)
    const player = await playerRef.get()
    return player.data() as UserModel
  }

  useEffect(() => {
    let isActive = true
    //cas ou l'url est changée
    if (location == undefined || id == undefined) {
      history.push('/join')
    } else {
      // isCreator = location.isCreator
      // user = location.user
      // lobby_data = location.lobby
      // lobby = db.collection('lobbys').where('lobby_id', '==', lobby_id) //get lobby query
      // game = db.collection('games').where('game_id', '==', lobby_data.game[0])
      // // game = db.collection('Games').doc('aLjaHPcCvXrwPz1LIUai')
    }
    getLobby()
    return () => {
      isActive = false
    }
  }, [id])

  useEffect(() => {
    let isActive = true
    fetchtUsers()
    return () => {
      isActive = false
    }
  }, [userId])

  useEffect(() => {
    let isActive = true
    if (gameStarted) redirect()
    return () => {
      isActive = false
    }
  }, [gameStarted])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
      } else {
        db.collection('Lobbys').doc(lobbyId).update({})
        history.push('/login')
      }
    })
  }, [change])

  function start() {
    db.collection('Games').doc(gameId).update({ is_game_started: true })
  }

  const startGame = async (game_id: number) => {
    // const requestOptions = {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     is_game_started: true,
    //     lobby: lobby_id,
    //     winners: [],
    //   }),
    // }
    // let r = await fetch(serverUrl + 'games/' + game_id, requestOptions)
    // let data = await r.json()
    // return data
  }

  return (
    <Col>
      <Row className="justify-content-center">
        <UsersList users={users} />
      </Row>
      {isCreator && (
        <Row className="justify-content-center">
          <Button variant="outline-secondary" onClick={start}>
            Start
          </Button>
          <br></br>
        </Row>
      )}
      <Row className="justify-content-center">Code du Lobby: {code}</Row>
    </Col>
  )
}

export default LobbyScreen as React.ComponentType<any>
