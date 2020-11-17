import React, { useEffect } from 'react'

interface User {
  id: number
  username: string
  player: string
  lobby: string
}
interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const serverUrl = process.env.REACT_APP_SERVER_URL

interface HttpResponse<T> extends Response {
  parsedBody?: T
}
export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request)
  response.parsedBody = await response.json()
  return response
}
