import React, { FC } from 'react'
import { ListGroup } from 'react-bootstrap'
import UserModel from '../../models/UserModel'
import UserCard from './UserCard'

interface IProps {
  users: UserModel[]
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
    <ListGroup>
      {users &&
        users.map((user) => {
          return <UserCard key={user.id} user={user} />
        })}
    </ListGroup>
  )
}

export default UsersList
