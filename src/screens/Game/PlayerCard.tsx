import PlayerModel from 'models/PlayerModel'
import React, { FC } from 'react'
import { Row, ListGroup, Button } from 'react-bootstrap'

interface IProps {
  key: string
  player: PlayerModel
}

const PlayerCard: FC<IProps> = (props) => {
  const { key, player } = props

  console.log(player.player_id)
  return (
    <Row>
      <ListGroup.Item key={key} className="">
        {player.username}
      </ListGroup.Item>
    </Row>
  )
}

export default PlayerCard
