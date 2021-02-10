import React, { FC } from 'react'
import { Row, ListGroup } from 'react-bootstrap'
import UserModel from '../../models/UserModel'

interface IProps {
  user: UserModel
  key: string
}

interface Todos {
  userId: number
  id: number
  title: string
  completed: boolean
}

const UserCard: FC<IProps> = (props) => {
  const { key, user } = props
  return (
    <Row>
      <ListGroup.Item key={key}>{user.username}</ListGroup.Item>
    </Row>
  )
}

export default UserCard
