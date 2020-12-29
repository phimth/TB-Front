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
  //const [isCreator, setIsCreator] = useState<boolean>()
  const isCreator = location.isCreator
  const code = id.slice(0, 6).toUpperCase()
  const history = useHistory()
  const lobby = db.collection('Lobbys').where('lobby_id', '==', code)
  const game = db.collection('Games').where('game_id', '==', code)
  const [user, setUser] = useState<UserModel>()

  const [change, setChange] = useState(false)

  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [userId, setUserId] = useState<string[]>([])
  const [users, setUsers] = useState<UserModel[]>([])
  const redirect = () => history.push('/game/' + id, { isCreator, code })

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
        setUserId(array)
      })
    })
    game.onSnapshot((doc) => {
      doc.docChanges().forEach((change) => {
        const data = change.doc.data()
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
        // db.collection('Lobbys') //safe way pour set le createur
        //   .doc(id)
        //   .get()
        //   .then((doc) => {
        //     if (doc.exists) {
        //       if (doc.data()?.host_id == user.uid) {
        //         setIsCreator(true)
        //       }
        //     }
        //   })
        var userStatusDatabaseRef = firebase
          .database()
          .ref('/status/' + user.uid)
        var userStatusFirestoreRef = firebase
          .firestore()
          .doc('/status/' + user.uid)
        var isOfflineForDatabase = {
          state: 'offline',
          last_changed: firebase.database.ServerValue.TIMESTAMP,
        }

        var isOnlineForDatabase = {
          state: 'online',
          last_changed: firebase.database.ServerValue.TIMESTAMP,
        }
        var isOfflineForFirestore = {
          state: 'offline',
          last_changed: firebase.firestore.FieldValue.serverTimestamp(),
        }

        var isOnlineForFirestore = {
          state: 'online',
          last_changed: firebase.firestore.FieldValue.serverTimestamp(),
        }
        firebase
          .database()
          .ref('.info/connected')
          .on('value', function (snapshot) {
            // If we're not currently connected, don't do anything.
            if (snapshot.val() == false) {
              userStatusFirestoreRef.set(isOfflineForFirestore)
              return
            }
            // If we are currently connected, then use the 'onDisconnect()'
            // method to add a set which will only trigger once this
            // client has disconnected by closing the app,
            // losing internet, or any other means.
            userStatusDatabaseRef
              .onDisconnect()
              .set(isOfflineForDatabase)
              .then(function () {
                userStatusDatabaseRef.set(isOnlineForDatabase)
                userStatusFirestoreRef.set(isOnlineForFirestore)
              })
          })
        setUser({ id: user.uid, username: user.displayName })
      } else {
        history.push('/login')
      }
    })
  }, [change])

  //useEffect(() => {}, [user])

  function start() {
    db.collection('Games').doc(id).update({ is_game_started: true })
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
