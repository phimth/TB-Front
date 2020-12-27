import firebase from 'firebase'
import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
  useParams,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { auth } from '../../services/index'

const SignUpScreen = () => {
  const [validated, setValidated] = React.useState(false)
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [error, setError] = React.useState<string>('')
  const [pseudo, setPseudo] = React.useState<string>('')

  const history = useHistory()

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
      createUser()
    }
    e.preventDefault()
    setValidated(true)
  }

  const createUser = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user?.updateProfile({ displayName: pseudo })
        history.push('/')
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        setError(errorMessage)
      })
  }

  return (
    <Row className="justify-content-center">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Veuillez entrer votre email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPseudo">
          <Form.Label>Pseudo</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Pseudo"
            onChange={(e) => setPseudo(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Veuillez entrer votre pseudo
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Veuillez entrer un mot de passe.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="outline-secondary" type="submit">
          Log in
        </Button>
        <br />
        {error}
      </Form>
    </Row>
  )
}

export default SignUpScreen
