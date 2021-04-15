import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col, Navbar } from 'react-bootstrap'
import {
  useParams,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { auth, db } from '../../services/index'

const SignUpScreen = () => {
  const [validated, setValidated] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [pseudo, setPseudo] = useState<string>('')
  const [change, setChange] = useState(false)

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
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return auth
          .createUserWithEmailAndPassword(email, password)
          .then(async (user) => {
            await user.user?.updateProfile({ displayName: pseudo })
            const player = await db
              .collection('Players')
              .doc(user.user?.uid)
              .set({
                id: user.user?.uid,
                username: user.user?.displayName,
              })
            history.push('/')
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            setError(errorMessage)
          })
      })
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  useEffect(() => {
    let isActive = true
    return () => {
      isActive = false
    }
  }, [change])

  return (
    <div className="">
      <Navbar className="justify-content-center">
        <Button
          variant="outline-dark"
          size="lg"
          onClick={() => history.push('/')}
        >
          TimeBomb
        </Button>
      </Navbar>
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
            Register
          </Button>
          <br />
          {error}
        </Form>
      </Row>
    </div>
  )
}

export default SignUpScreen
