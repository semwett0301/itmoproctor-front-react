import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

const UserExams: FC = () => {
  const { id } = useParams()
  return <>{id}</>
}

export default UserExams
