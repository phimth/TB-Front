import React, { FC } from 'react'
import UserModel from '../../models/UserModel'

interface IProps {
  user: Todos
}

interface Todos {
  userId: number
  id: number
  title: string
  completed: boolean
}

const UserCard: FC<IProps> = (props) => {
  const { user } = props
  return <div>{user.title}</div>
}

export default UserCard
