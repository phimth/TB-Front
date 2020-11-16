import React from 'react'

interface User {
  id: number
  username: string
  player: string
  lobby: string
}

const serverUrl = process.env.REACT_APP_SERVER_URL

async function getLobby(): Promise<User[]> {
  return await fetch(serverUrl + 'users')
    .then((res) => res.json())
    .then((res) => {
      return res as User[]
    })
}
