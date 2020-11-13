import React from 'react'
import Button from 'react-bootstrap/Button'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Button variant="outline-secondary" size="lg">
          Create a game
        </Button>{' '}
        <Button variant="outline-secondary" size="lg">
          Join a game
        </Button>{' '}
      </div>
    )
  }
}

export default Home
