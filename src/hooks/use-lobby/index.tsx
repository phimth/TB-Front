import { useEffect, useState } from 'react'
import LobbyModel from '../../models/LobbyModel'
//import { db } from '../../services'
import * as db from 'db.json'

interface Output {
  isFetching: boolean
  todo?: Todos
}
interface Todos {
  userId: number
  id: string
  title: string
  completed: boolean
}
const UseLobby = async (_id: string): Promise<Output> => {
  const [lobby, setLobby] = useState<LobbyModel | undefined>()
  const [todo, setTodo] = useState<Todos | undefined>()
  const [isFetching, setIsFetching] = useState<boolean>(true)

  const getTodos = async () => {
    let r = await fetch('https://jsonplaceholder.typicode.com/todos')
    let todos = await r.json()
    setTodo(todos)
    setIsFetching(false)
  }

  /*useEffect(() => {
    const unsubscribe = async () => {
      const _lobby = await lobbys.find((lobby) => lobby.lobby_id === _id)
      if (_lobby != undefined) {
        setLobby(_lobby as LobbyModel)
        console.log(_id)
        console.log(_lobby)
      } else {
        console.log('Le Lobby n existe pas')
      }
      setIsFetching(false)
    }

    return () => {
      console.log('there')
      unsubscribe()
    }
  }, [_id])*/
  useEffect(() => {
    getTodos()
  }, [_id])
  console.log('here')
  return { isFetching, todo }
}

export default UseLobby
