import React, { useEffect } from 'react'
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
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const [name, setName] = React.useState('')

  const [validateName, setValidateName] = React.useState(false)

  const [code, setCode] = React.useState('')

  const [user, setUser] = React.useState()

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
      setValidateName(true)
    }
    setValidated(true)
  }

  const createUser = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: name }),
    }
    fetch(serverUrl + 'users/', requestOptions)
      .then(async (response) => {
        const data = await response.json()

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status
          return Promise.reject(error)
        }
        setUser(data)
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }

  const createRoom = async () => {
    //vérifier si user n'est pas déjà host
    //générer id qui n'existe pas
    //créer lobby avec cet id
    //update user's lobby_id
    //return lobby_id
  }

  useEffect(() => {
    createUser()
  }, [validateName])

  useEffect(() => {
    createRoom()
  }, [user])

  function create() {
    history.push('/lobby/1', true) //mettre new id
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
