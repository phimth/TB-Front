import PlayerModel from 'models/PlayerModel'
import React, { FC } from 'react'
import { ListGroup } from 'react-bootstrap'
import PlayerCard from './PlayerCard'

interface IProps {
  players: PlayerModel[]
}

const PlayersList: FC<IProps> = (props) => {
  const { players } = props
  return (
    <ListGroup>
      {players &&
        players.map((player) => {
          return <PlayerCard key={player.player_id} player={player} />
        })}
    </ListGroup>
  )
}

export default PlayersList
