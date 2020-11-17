import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
  useParams,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom'
import UseLobby from '../../hooks/use-lobby'
import { http } from '../../API'
import UsersList from './UsersList'
import UserModel from '../../models/UserModel'
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

const LobbyScreen: React.FC = () => {
  const id = useParams<Params>().id
  const history = useHistory()
  const redirect = () => history.push('/game' + id)
  const location = useLocation()
  const isCreator = location.state
  const [users, setUsers] = useState<UserModel[]>([])
  const [roomExists, setRoomExists] = useState(true)

  const [todos, setTodos] = useState<Todos>()

  const getTodos = async () => {
    let r = await fetch('https://jsonplaceholder.typicode.com/todos/' + id)
    //.then((response) => response.json())
    //.then((data) => setTodos(data))
    setRoomExists(r.ok)
    let todo = await r.json()
    setTodos(todo)
  }

  useEffect(() => {
    getTodos()
  }, [id])
  function start() {
    redirect()
  }
  if (roomExists) {
    return (
      <Col>
        <Row className="justify-content-center">
          <UsersList users={users} />
          <p>{todos?.title}</p>
        </Row>
        {isCreator ? (
          <Row className="justify-content-center">
            <Button variant="outline-secondary" onClick={start}>
              Start
            </Button>
          </Row>
        ) : (
          <div>hi</div>
        )}
      </Col>
    )
  } else {
    return <div>Room does not exists</div>
  }
}

export default LobbyScreen as React.ComponentType<any>
