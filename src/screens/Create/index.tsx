import React, { useEffect } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
  useParams,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom'
import UserModel from '../../models/UserModel'
import useCreateUser from '../../hooks/use-create-user'
interface Props {
  isCreator: boolean
  join: () => void
}

interface CreateFormProps {
  name: string
  create(): void
}

const CreateScreen: React.FC<Props> = (props) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const [name, setName] = React.useState<string>()

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
      runCreate()
    }
    e.preventDefault()
    setValidated(true)
  }

  const createUser = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: name }),
    }
    let r = await fetch(serverUrl + 'users/', requestOptions)

    let data = await r.json()
    return data
  }

  const createLobby = async (id: number) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ host: id }),
    }
    let r = await fetch(serverUrl + 'lobby-management/', requestOptions)

    let data = await r.json()
    return data
  }

  const runCreate = async () => {
    try {
      const data = await createUser()
      const lobby = await createLobby(data.id)
      history.push('lobby/' + lobby.id, { isCreator: true, user: data })
    } catch (error) {
      console.log(error)
    }
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
