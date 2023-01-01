import { Group } from '@modules/settings/models'
import { Account } from '@modules/users/models/Account'
import usersService from '@modules/users/services/users.service'
import { Input } from '@shared/components/form'
import httpErrorHandler from '@utils/error-handler'
import { showLoading } from '@utils/toast'
import React, { useEffect, useRef, useState } from 'react'
import GroupsUsersItem from '../groups-users-item/GroupsUsersItem'

type GroupsUsersProps = {
    group: Group
}

const GroupsUsers = ({
    group
}: GroupsUsersProps) => {
    const [users, setUsers] = useState<Account[]>([]);
    const [loading, setLoading] = useState<any>(false);
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [dataState, setDataState] = useState({
        filters: null,
        first: 0,
        page: 1,
        limit: 10,
        sortField: null,
        sortOrder: null,
        search: ''
    })

    const listInnerRef = useRef<HTMLDivElement>(null)

    const getUsers = () => {
        setDataLoading(true)
        usersService.list({ ...dataState }).then(
            res => {
                setUsers(prev => [...prev, ...res.data.docs])
                setTotalRecords(res.data.total)
            }
        ).catch(error => {
            const { status, message } = httpErrorHandler(error);
            console.error({ status, message })
        }).finally(() => setDataLoading(false))
    }

    useEffect(() => {
        getUsers()
    }, [dataState])

    const onSearch = (e: any) => {
        setUsers([])
        setDataState((prev: any) => ({
            ...prev,
            search: e.target.value,
            page: 1
        }))
    }

    const saveAccount = async (user: Account, onError: any) => {
        setLoading(true)
        try {
            await usersService.update(user._id!, user)
        } catch (error: any) {
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

    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight && totalRecords > users?.length!) {
                setDataState((prev: any) => ({ ...prev, page: ++prev.page }))
            }
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            <Input type="text" autoComplete='off' name="code" placeholder='Search'
                onChange={onSearch} value={dataState.search} />
            <div onScroll={onScroll}
                ref={listInnerRef}
                className="flex flex-col h-72 overflow-y-auto px-2 gap-2">
                {
                    users?.map(user => (
                        <div key={user._id}>
                            <GroupsUsersItem user={user} group={group}
                                addToGroup={addToGroup}
                                removeFromGroup={removeFromGroup} />
                        </div>
                    ))
                }

                {dataLoading ? (
                    <p className='text-center font-bold text-gray-700'>Loading...</p>
                ) : null}
            </div>
        </div>
    )
}

export default GroupsUsers