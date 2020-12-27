import firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
  useParams,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { auth } from '../../services/index'

const LoginScreen = () => {
  const [validated, setValidated] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
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
      e.preventDefault()
      login()
    }
    setValidated(true)
  }

  const login = () => {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        return auth
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            history.push('/')
          })
          .catch((error) => {
            var errorCode = error.code
            var errorMessage = error.message
            if (errorCode === 'auth/wrong-password') {
              setError('Wrong password.')
            } else {
              setError(errorMessage)
            }
          })
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
      })
  }

  // useEffect(() => {
  //   let isActive = true
  //   return () => {
  //     isActive = false
  //   }
  // })

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

export default LoginScreen
