import CardModel from 'models/CardModel'
import PlayerModel from 'models/PlayerModel'
import React, { FC } from 'react'
import { Row, ListGroup, Button, Col, Image } from 'react-bootstrap'
import bomb from '../../assets/bomb.jpg'
import cable from '../../assets/cable.jpg'
import defuser from '../../assets/defuser.jpg'

interface IProps {
  id: number
  type: string
  hidden: boolean
  self: boolean
  select: (_card: CardModel) => void
  clickable: boolean
}

const PlayerCard: FC<IProps> = (props) => {
  const { id, type, hidden, self, select, clickable } = props
  let card
  if (!self || hidden) {
    card = cable // remplacer par verso
  } else if (type == 'bomb') {
    card = bomb
  } else if (type == 'cable') {
    card = cable
  } else if (type == 'defuser') {
    card = defuser
  }

  const choose = () => {
    if (clickable && hidden) {
      select({ card_id: id, type: type, hidden: hidden } as CardModel)
    } else {
    }
  }
  return (
    <Image
      style={{ marginLeft: 10, width: 90, height: 155 }}
      src={card}
      rounded
      onClick={() => choose()}
    />
  )
}

export default PlayerCard
