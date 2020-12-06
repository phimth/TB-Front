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
import useTodos from '../../hooks/useTodos'
import { db, database } from '../../services'
import { cleanup } from '@testing-library/react'
type TParams = { id: string }

interface Todos {
  userId: number
  id: number
  title: string
  completed: boolean
}

interface Params {
  id: string
}

interface ILocation {
  isCreator: boolean
  user: UserModel
}
const LobbyScreen: React.FC = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const id = useParams<Params>().id
  const history = useHistory()
  const redirect = () => history.push('/game/' + id)
  const location = useLocation<ILocation>().state
  const isCreator = location.isCreator
  const user = location.user

  const [text, setText] = useState<string>()
  const [users, setUsers] = useState<UserModel[]>([])

  const [todos, setTodos] = useState<Todos[]>([])
  const getLobby = async () => {
    // to export
    let r = await fetch(serverUrl + 'lobby/' + id + '/users') //serverUrl+id
    //.then((response) => response.json())
    //.then((data) => setTodos(data))
    let lobby = await r.json()
    let list = lobby[0].users
    if (list.length == 0) history.push('/join') // gérer tous les cas d'erreur
    setUsers([])
    for (let i = 0; i < list.length; i++) {
      let _user = await getUsers(list[i])
      setUsers((users) => users.concat(_user))
    }

    const game = db.collection('Games').doc('aLjaHPcCvXrwPz1LIUai')
    game.onSnapshot((doc) => {
      if (doc && doc.exists) {
        const data = doc.data()
        setText(data?.started.toString())
      }
    })
  }

  const getUsers = async (_id: number) => {
    let r = await fetch(serverUrl + 'users/' + _id)
    let user = await r.json()
    return user
  }

  useEffect(() => {
    //cas ou l'url est changée
    if (location == undefined || id == undefined) {
      history.push('/join')
    }
    // else {
    //   isCreator = location.isCreator
    //   user = location.user
    //   console.log(isCreator)
    // }
    getLobby()
    if (text?.toString() == 'false') {
      history.push('/join')
    }
  }, [id, text]) // add userlist
  function start() {
    redirect()
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
        </Row>
      )}
    </Col>
  )
}

export default LobbyScreen as React.ComponentType<any>
