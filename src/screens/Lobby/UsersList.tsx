import React, { FC } from 'react'
import UserModel from '../../models/UserModel'
import UserCard from './UserCard'

interface IProps {
  users: Todos[]
}

interface Todos {
  userId: number
  id: number
  title: string
  completed: boolean
}

const UsersList: FC<IProps> = (props) => {
  const { users } = props
  return (
    <ul>
      {users &&
        users.map((user) => {
          return <UserCard key={user.id} user={user} />
        })}
    </ul>
  )
}

export default UsersList
