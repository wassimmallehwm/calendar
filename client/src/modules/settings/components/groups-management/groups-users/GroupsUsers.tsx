import { Group } from '@modules/settings/models'
import { Account } from '@modules/users/models/Account'
import usersService from '@modules/users/services/users.service'
import { Input } from '@shared/components/form'
import httpErrorHandler from '@utils/error-handler'
import { showLoading } from '@utils/toast'
import React, { useEffect, useState } from 'react'
import GroupsUsersItem from '../groups-users-item/GroupsUsersItem'

type GroupsUsersProps = {
    group: Group
}

const GroupsUsers = ({
    group
}: GroupsUsersProps) => {
    const [users, setUsers] = useState<Account[] | undefined>();
    const [loading, setLoading] = useState<any>(false);
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [dataState, setDataState] = useState({
        filters: null,
        first: 0,
        page: 1,
        limit: 10,
        sortField: null,
        sortOrder: null
    })
    const [search, setSearch] = useState<string>('')

    const getUsers = () => {
        setDataLoading(true)
        usersService.list({ ...dataState, search }).then(
            res => {
                setUsers(res.data.docs)
                setTotalRecords(res.data.total)
                setDataLoading(false)
            }
        ).catch(error => {
            const { status, message } = httpErrorHandler(error);
            console.error({ status, message })
        }).finally(() => setDataLoading(false))
    }

    useEffect(() => {
        getUsers()
    }, [dataState, search])

    const getUsersInGroup = () => {
        return users?.filter(user => user.groups?.find(elem => elem._id == group._id) != undefined)
    }

    const getUsersOutGroup = () => {
        return users?.filter(user => user.groups?.find(elem => elem._id == group._id) == undefined)
    }

    const onSuccess = (user: Account) => {

    }

    const saveAccount = async (user: Account, onError: any) => {
        setLoading(true)
        try {
            await usersService.update(user._id!, user)
            onSuccess(user)
        } catch (error) {
            const { message } = httpErrorHandler(error);
            onError(user)
            //showToast('error', message)
        } finally {
            setLoading(false)
        }
    }

    const addToGroup = (user: Account) => {
        addToGroupState(user)
        saveAccount(user, removeFromGroupState)
    }

    const removeFromGroup = (user: Account) => {
        removeFromGroupState(user)
        saveAccount(user, addToGroupState)
    }

    const addToGroupState = (user: Account) => {
        user.groups?.push(group)
        setUsers(prev => prev?.map(elem => {
            if (elem._id == user._id) {
                elem.groups?.push(group)
                return elem
            }
            return elem
        }))
    }

    const removeFromGroupState = (user: Account) => {
        user.groups = user.groups?.filter(data => data._id != group._id)
        setUsers(prev => prev?.map(elem => {
            if (elem._id == user._id) {
                elem.groups = elem.groups?.filter(data => data._id != group._id)
                return elem
            }
            return elem
        }))
    }

    return (
        <div className='flex flex-col gap-2'>
            <Input type="text" autoComplete='off' name="code" placeholder='Search'
                onChange={(e: any) => setSearch(e.target.value)} value={search} />
            <div className="flex flex-col justify-center px-2 gap-2">
                {
                    users?.map(user => (
                        <div key={user._id}>
                            <GroupsUsersItem user={user} group={group}
                                addToGroup={addToGroup}
                                removeFromGroup={removeFromGroup} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GroupsUsers