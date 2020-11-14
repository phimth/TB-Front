import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
} from 'react-router-dom'

const LoginScreen = () => {

    const history = useHistory()
    const redirect = () => history.push('/lobby')

    function enter() {
        redirect()
    }

    return (
        <Row className="justify-content-center">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Pseudo</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        Please select your name ingame.
                    </Form.Text>
                </Form.Group>

                <Button variant="outline-secondary" onClick={enter}>
                    Join
            </Button>
            </Form>
        </Row>
    )
}

export default LoginScreen