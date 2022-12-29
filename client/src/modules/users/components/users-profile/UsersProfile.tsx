import React, { useContext } from 'react'
import { AuthContext } from 'src/contexts'
import { userImage } from '@utils/filePath'

const UsersProfile = () => {
    const { user } = useContext(AuthContext)


    return (
            <div className="main-div">
                <img className="h-16 w-16 rounded-full" src={userImage(user?.imagePath!)} alt={user?.displayName} />
                {user?.displayName}
            </div>
        )
}

export default UsersProfile