import React from 'react'
import { Group } from '@modules/settings/models/Group'
import { Input } from '@shared/components/form'


interface GroupsFormProps {
    group: Group,
    onChange: any
}

const GroupsForm = ({
    group,
    onChange
}: GroupsFormProps) => {
    return (
        <form className='flex flex-col gap-6 space-y-6'>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Label
                </label>
                <input type="text" name="label" value={group?.label} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
        </form>
    )
}

export default GroupsForm