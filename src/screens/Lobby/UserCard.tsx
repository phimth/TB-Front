import React, { FC } from 'react'
import UserModel from '../../models/UserModel'

interface IProps {
  user: UserModel
}

const UserCard: FC<IProps> = (props) => {
  const { user } = props
  return <div>{user.username}</div>
}

export default UserCard
