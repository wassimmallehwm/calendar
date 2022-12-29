import { Group } from '@modules/settings/models'
import groupsService from '@modules/settings/services/groups.service'
import { Account } from '@modules/users/models/Account'
import { MultipleSelect } from '@shared/components/form'
import React, { useEffect, useState } from 'react'
import { ActionMeta, MultiValue } from 'react-select'

type UsersGroupsProps = {
    user: Account
    onChange: any
}

const UsersGroups = ({
    user,
    onChange
}: UsersGroupsProps) => {
    const [groups, setGroups] = useState<Group[]>([])

    const getGroups = () => {
        groupsService.findAll()
            .then(res => setGroups(res))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        getGroups()
    }, [])

    const groupsList = () => groups
        .filter(group => user.groups?.find(elem => elem._id == group._id) == undefined)
        .map(elem => {
            elem.value = elem._id
            return elem
        })

    const onChangeOptions = (newValue: MultiValue<Group>, actionType: ActionMeta<Group>) => {
        if(actionType.action == 'remove-value'){
            const value = user.groups?.filter(group => group._id != actionType.removedValue._id)
            onChange(value)
        } else {
            onChange(newValue)
        }
    }

    return (
        <div className='w-full py-6 mb-6'>
            <MultipleSelect
                isLoading={false}
                id="multiselect-groups"
                placeholder="Groups"
                options={groupsList()}
                labelKey={(option: any) => `${option.label}`}
                renderMenuItemChildren={(option: any) => <span>{option.label}</span>}
                onChange={onChangeOptions}
                selected={user.groups}
            />
        </div>
    )
}

export default UsersGroups