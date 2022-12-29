import { Group } from '@modules/settings/models'
import { Account } from '@modules/users/models/Account'
import usersService from '@modules/users/services/users.service'
import httpErrorHandler from '@utils/error-handler'
import React, { useEffect, useState } from 'react'

type GroupsUsersProps = {
    group: Group
}

const GroupsUsers = ({
    group
}: GroupsUsersProps) => {
    const [users, setUsers] = useState<Account[] | undefined>();
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
    }, [])

    const getUsersInGroup = () => {
        return users?.filter(user => user.groups?.find(elem => elem._id == group._id) != undefined)
    }

    const getUsersOutGroup = () => {
        return users?.filter(user => user.groups?.find(elem => elem._id == group._id) == undefined)
    }

    const addToGroup = (user: Account) => {
        setUsers(prev => prev?.map(elem => {
            if(elem._id == user._id){
                elem.groups?.push(group)
                return elem
            }
            return elem
        }))
    }

    const removeFromGroup = (user: Account) => {
        setUsers(prev => prev?.map(elem => {
            if(elem._id == user._id){
                elem.groups = elem.groups?.filter(data => data._id != group._id)
                return elem
            }
            return elem
        }))
    }

    return (
        <div>
            In Group
            <div>
                {
                    getUsersInGroup()?.map(user => (
                        <div key={user._id} className="flex items-center gap-4">
                            <p> {user.displayName} </p>
                            <button onClick={() => removeFromGroup(user)} className='bg-red-500'>REMOVE</button>
                        </div>
                    ))
                }
            </div>
            Out Group
            <div>
                {
                    getUsersOutGroup()?.map(user => (
                        <div key={user._id} className="flex items-center gap-4">
                            <p> {user.displayName} </p>
                            <button onClick={() => addToGroup(user)} className='bg-red-500'>ADD</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GroupsUsers