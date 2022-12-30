import { Group } from '@modules/settings/models'
import { Account } from '@modules/users/models/Account'
import { Button } from '@shared/components'
import { userImage } from '@utils/filePath'
import React from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'

type GroupsUsersItemProps = {
  group: Group,
  user: Account,
  addToGroup: any,
  removeFromGroup: any
}

const GroupsUsersItem = ({
  group,
  user,
  addToGroup,
  removeFromGroup
}: GroupsUsersItemProps) => {

  const inGroup = () => user.groups?.find(elem => elem._id == group._id) != undefined

  return (
    <div className="flex items-center justify-between gap-4">
      <div className='flex items-center gap-4'>
        <img className="h-8 w-8 rounded-full" src={userImage(user?.imagePath!)} alt={user?.displayName} />
        <p> {user.displayName} </p>
      </div>
      {
        inGroup() ? (
          <Button outline rounded color='secondary' onClick={() => removeFromGroup(user)}>
            <FaTimes/>
          </Button>
        ) : (
          <Button outline rounded color='primary' onClick={() => addToGroup(user)}>
            <FaPlus/>
          </Button>
        )
      }
    </div>
  )
}

export default GroupsUsersItem