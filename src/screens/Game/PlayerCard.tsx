import PlayerModel from 'models/PlayerModel'
import React, { FC } from 'react'
import { Row, ListGroup, Button, Col, Image } from 'react-bootstrap'
import Card from './Card'
import CardModel from 'models/CardModel'

interface IProps {
  key: string
  player: PlayerModel
  self: boolean
  select: (_card: CardModel, _player: PlayerModel) => void
  clickable: boolean
}

const PlayerCard: FC<IProps> = (props) => {
  const { self, player, select, clickable } = props

  const pick = (_card: CardModel) => {
    select(_card, player)
  }

  return (
    <Row>
      <Col>
        <Row className="mb-2">
          <ListGroup.Item className="" variant={self ? 'success' : ''}>
            {player.username}
          </ListGroup.Item>
          {player &&
            player.hand.map((card) => {
              return (
                <Card
                  key={card.card_id}
                  id={card.card_id}
                  type={card.type}
                  hidden={card.hidden}
                  self={self}
                  select={(_card: CardModel) => pick(_card)}
                  clickable={clickable}
                />
              )
            })}
        </Row>
        <Row className="mb-3">
          <p className="pr-3">Defusers : {player.announced.defusers} </p>
          <p>Bomb : {player.announced.bomb ? ' oui' : ' non'}</p>
        </Row>
      </Col>
    </Row>
  )
}

export default PlayerCard
