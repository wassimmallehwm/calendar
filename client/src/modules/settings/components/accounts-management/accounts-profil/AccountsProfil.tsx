import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext, ErrorContext } from 'src/contexts'
import { Account, EmptyAccount } from '@modules/settings/models/Account'
import { Role } from '@modules/settings/models/Role'
import accountsService from '@modules/settings/services/accounts.service'
import rolesService from '@modules/settings/services/roles.service'
import { Button, Loader } from '@shared/components'
import { Select } from '@shared/components/form'
import { httpErrorHandler, showLoading, showToast } from 'src/utils'

const AccountsProfil = () => {
    const { setError } = useContext(ErrorContext)
    const { user } = useContext(AuthContext)
    const params = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false);


    return loading ? <Loader /> :
        (
            <div className="main-div">
                {user.displayName}
            </div>
        )
}

export default AccountsProfil