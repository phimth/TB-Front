import { useState } from 'react'
import UserModel from '../../models/UserModel'

interface Output {
  createUser: () => void
  isCreatingUser: boolean
}

const useCreateUser = (name: string): Output => {
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const [isCreatingUser, setIsCreatingUser] = useState(false)

  async function createUser() {
    setIsCreatingUser(true)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: name }),
    }

    await fetch(serverUrl + 'users/', requestOptions)
      .then(async (response) => {
        const data = await response.json()

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status
          return Promise.reject(error)
        }
        console.log(data.id)
        return data.id
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }
  return { createUser, isCreatingUser }
}

export default useCreateUser
