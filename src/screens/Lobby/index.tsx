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
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const id = useParams<Params>().id
  const history = useHistory()
  const redirect = () => history.push('/game/' + id)
  const location = useLocation()
  const isCreator = location.state
  const [isFetching, setFetching] = useState(false)
  const [users, setUsers] = useState<UserModel[]>([])

  const [todos, setTodos] = useState<Todos[]>([])

  const getTodos = async () => {
    // to export
    let r = await fetch(serverUrl + '?userId=' + id) //serverUrl+id
    //.then((response) => response.json())
    //.then((data) => setTodos(data))
    let todo = await r.json()
    setTodos(todo)
    if (todo.length == 0) history.push('/join') // case user change url
  }

  useEffect(() => {
    setFetching(false)
    getTodos()
    setFetching(true)
  }, [id]) // add userlist
  function start() {
    redirect()
  }
  return (
    <Col>
      <Row className="justify-content-center">
        {isFetching ? <UsersList users={todos} /> : <div>Loading users..</div>}
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
}

export default LobbyScreen as React.ComponentType<any>
