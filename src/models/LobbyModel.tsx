export interface LobbyModel {
  lobby_id: string
  players: string[]
  max_players: number
  host_id: string
}

export default LobbyModel
