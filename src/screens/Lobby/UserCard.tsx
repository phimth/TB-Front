import React, { FC } from 'react'
import { Row, ListGroup } from 'react-bootstrap'
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
  return (
    <Row>
      <ListGroup.Item>{user.username}</ListGroup.Item>
    </Row>
  )
}

export default UserCard
