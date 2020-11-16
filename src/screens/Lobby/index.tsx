import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'

interface Lobby {
  lobby_id: number
  players: []
  max_players: number
  host_id: number
}

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

interface User {
  id: number
  username: string
  player: string
  lobby: string
}

const serverUrl = process.env.REACT_APP_SERVER_URL

async function getLobby(): Promise<User[]> {
  return await fetch(serverUrl + 'users')
    .then((res) => res.json())
    .then((res) => {
      return res as User[]
    })
}

interface Props {
  isCreator: boolean
  start: () => void
}

const LobbyScreen: React.FC<Props> = (props) => {
  //let user: User[] = new Array()
  /*await getLobby().then(function (res) {
    for (const [key, value] of Object.entries(res)) {
      user.push(value as User)
    }
  })*/
  function start() {
    props.start()
  }

  return (
    <Col>
      <Row className="justify-content-center">Liste</Row>
      {props.isCreator ? (
        <Row className="justify-content-center">
          <Button variant="outline-secondary" onClick={start}>
            Start
          </Button>
        </Row>
      ) : null}
    </Col>
  )
}

export default LobbyScreen
