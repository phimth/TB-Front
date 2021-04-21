import PlayerModel from 'models/PlayerModel'
import React, { FC } from 'react'
import { ListGroup } from 'react-bootstrap'
import PlayerCard from './PlayerCard'
import CardModel from 'models/CardModel'

interface IProps {
  players: PlayerModel[]
  id: string | undefined
  select: (_card: CardModel, _player: PlayerModel) => void
  clickable: boolean
}

const PlayersList: FC<IProps> = (props) => {
  const { id, players, select, clickable } = props
  return (
    <ListGroup>
      {players &&
        players.map((player) => {
          let self = false
          if (player.id == id) {
            self = true
          }
          return (
            <PlayerCard
              key={player.id}
              player={player}
              self={self}
              select={(_card: CardModel, _player: PlayerModel) =>
                select(_card, _player)
              }
              clickable={clickable}
            />
          )
        })}
    </ListGroup>
  )
}

export default PlayersList
