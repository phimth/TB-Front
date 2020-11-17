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

const LoginScreen: React.FC<Props> = (props) => {
  const [name, setName] = React.useState('')

  const [code, setCode] = React.useState('')

  const location = useLocation()
  const isCreator = location.state

  const history = useHistory()

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    enter()
  }

  function enter() {
    if (isCreator) {
      history.push('/lobby', isCreator)
    } else {
      history.push('/lobby/' + code, isCreator)
    }
  }

  return (
    <Row className="justify-content-center">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Pseudo"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Text className="text-muted">Choisissez votre pseudo.</Form.Text>
          {!isCreator ? (
            <Form.Control
              type="text"
              placeholder="Code du Lobby"
              onChange={(e) => setCode(e.target.value)}
            />
          ) : null}
        </Form.Group>

        <Button variant="outline-secondary" onClick={handleSubmit}>
          {isCreator ? 'Create game' : 'Join game'}
        </Button>
      </Form>
    </Row>
  )
}

export default LoginScreen
