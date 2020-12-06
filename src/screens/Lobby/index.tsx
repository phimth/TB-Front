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
  let isCreator, user

  const [isFetching, setFetching] = useState(false)
  const [users, setUsers] = useState<UserModel[]>([])

  const [todos, setTodos] = useState<Todos[]>([])
  const getTodos = async () => {
    // to export
    let r = await fetch(serverUrl + 'lobby/' + id) //serverUrl+id
    //.then((response) => response.json())
    //.then((data) => setTodos(data))
    let todo = await r.json()
    setTodos(todo)
    if (todo.length == 0) history.push('/join') // gérer tous les cas d'erreur
  }

  useEffect(() => {
    //cas ou l'url est changée
    if (location == undefined || id == undefined) {
      history.push('/join')
    } else {
      isCreator = location.isCreator
      user = location.user
    }
    getTodos()
  }, [id]) // add userlist
  function start() {
    redirect()
  }
  return (
    <Col>
      <Row className="justify-content-center">
        <UsersList users={todos} />
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
