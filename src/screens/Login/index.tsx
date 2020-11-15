import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation
} from 'react-router-dom'

const LoginScreen = () => {
    const [name,setName] = React.useState("")

    const [code,setCode] = React.useState("")

    const location = useLocation()
    const isCreator = location.state

    const history = useHistory()
    const redirect = () => history.push('/lobby',isCreator)

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        enter()
      };

    function enter() {

        if(isCreator){

            redirect()

        }else{
            
            redirect()
        }
    }

    return (
        <Row className="justify-content-center">
            <Form>
                <Form.Group controlId="formBasicEmail"> 
                    <Form.Control type="text" placeholder="Pseudo" onChange={e => setName(e.target.value)}/>
                    <Form.Text className="text-muted">
                        Choisissez votre pseudo.
                    </Form.Text>
                    {!isCreator ?
                        <Form.Control type="text" placeholder="Code du Lobby" onChange={e => setCode(e.target.value)}/>
                    :null}
                </Form.Group>

                <Button variant="outline-secondary" onClick={handleSubmit}>
                    {isCreator ? 'Create game' : 'Join game'}
            </Button>
            </Form>
        </Row>
    )
}

export default LoginScreen