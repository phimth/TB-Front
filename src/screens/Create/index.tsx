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

interface CreateFormProps {
  name: string
  create(): void
}

const CreateScreen: React.FC<Props> = (props) => {
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
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      enter()
    }
    setValidated(true)
  }

  function enter() {
    history.push('/lobby/1', true)
  }

  return (
    <Row className="justify-content-center">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
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

        <Button variant="outline-secondary" type="submit">
          Create game
        </Button>
      </Form>
    </Row>
  )
}

export default CreateScreen