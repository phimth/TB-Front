import React from 'react'
import Button from 'react-bootstrap/Button'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

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

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
})

export default createAppContainer(AppNavigator)
