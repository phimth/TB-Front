import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'

interface Props {
  isCreator: boolean
  join: () => void
}

const LoginScreen: React.FC<Props> = (props) => {
  const [name, setName] = React.useState('')

  const [code, setCode] = React.useState('')

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    enter()
  }

  function enter() {
    if (props.isCreator) {
      props.join()
    } else {
      props.join()
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
          {!props.isCreator ? (
            <Form.Control
              type="text"
              placeholder="Code du Lobby"
              onChange={(e) => setCode(e.target.value)}
            />
          ) : null}
        </Form.Group>

        <Button variant="outline-secondary" onClick={handleSubmit}>
          {props.isCreator ? 'Create game' : 'Join game'}
        </Button>
      </Form>
    </Row>
  )
}

export default LoginScreen
