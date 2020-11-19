import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
  useParams,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom'

interface Props {
  isCreator: boolean
  join: () => void
}

const JoinScreen: React.FC<Props> = (props) => {
  const [name, setName] = React.useState('')

  const [code, setCode] = React.useState('')

  const history = useHistory()

  const [validated, setValidated] = React.useState(false)

  const handleSubmit = (e: {
    currentTarget: any
    preventDefault: () => void
    stopPropagation: () => void
  }) => {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      joinRoom()
      enter()
    }
    setValidated(true)
  }

  const joinRoom = async () => {
    //create new user with name
    //add user to user_lobby
    //return validate
  }

  function enter() {
    history.push('/lobby/' + code, { isCreator: false, name })
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
      </Form>
    </Row>
  )
}

export default JoinScreen
