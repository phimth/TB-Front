import PlayerModel from 'models/PlayerModel'
import React, { FC } from 'react'
import { Row, ListGroup, Button, Col, Image } from 'react-bootstrap'
import bomb from '../../assets/bomb.jpg'
import cable from '../../assets/cable.jpg'
import defuser from '../../assets/defuser.jpg'

interface IProps {
  type: string
  hidden: boolean
  self: boolean
}

const PlayerCard: FC<IProps> = (props) => {
  const { type, hidden, self } = props
  let card
  if (!self && !hidden) {
    card = cable
  } else if (type == 'bomb') {
    card = bomb
  } else if (type == 'cable') {
    card = cable
  } else if (type == 'defuser') {
    card = defuser
  }
  return (
    <Image
      style={{ marginLeft: 10, width: 90, height: 155 }}
      src={card}
      rounded
    />
  )
}

export default PlayerCard
