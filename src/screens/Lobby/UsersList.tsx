import React, { FC } from 'react'
import UserModel from '../../models/UserModel'
import UserCard from './UserCard'

interface IProps {
  users: UserModel[]
}

const UsersList: FC<IProps> = (props) => {
  const { users } = props
  return (
    <ul className="list-group">
      {users &&
        users.map((user) => {
          return <UserCard user={user} />
        })}
    </ul>
  )
}

export default UsersList
