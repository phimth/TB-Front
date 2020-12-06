import React, { FC } from 'react'
import UserModel from '../../models/UserModel'

interface IProps {
  user: UserModel
}

interface Todos {
  userId: number
  id: number
  title: string
  completed: boolean
}

const UserCard: FC<IProps> = (props) => {
  const { user } = props
  return <div>{user.username}</div>
}

export default UserCard
