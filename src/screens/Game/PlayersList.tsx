import PlayerModel from 'models/PlayerModel'
import React, { FC } from 'react'
import { ListGroup } from 'react-bootstrap'
import PlayerCard from './PlayerCard'

interface IProps {
  players: PlayerModel[]
  id: string | undefined
}

const PlayersList: FC<IProps> = (props) => {
  const { id, players } = props
  return (
    <ListGroup>
      {players &&
        players.map((player) => {
          let self = false
          if (player.id == id) {
            self = true
          }
          return <PlayerCard key={player.id} player={player} self={self} />
        })}
    </ListGroup>
  )
}

export default PlayersList
