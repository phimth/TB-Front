export interface LobbyModel {
  lobby_id: number
  players: number[]
  max_players: number
  host_id: number
  game: number[]
}

export default LobbyModel
