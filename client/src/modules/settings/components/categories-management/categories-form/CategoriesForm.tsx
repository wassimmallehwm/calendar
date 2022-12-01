import React from 'react'
import { Category } from '@modules/settings/models/Category'
import { Input } from '@shared/components/form'


interface CategoriesFormProps {
    category: Category,
    onChange: any
}

const CategoriesForm = ({
    category,
    onChange
}: CategoriesFormProps) => {
    return (
        <form className='flex flex-col gap-6 space-y-6'>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Label
                </label>
                <input type="text" name="label" value={category?.label} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div className='flex items-center justify-between gap-4'>
                    <div className='w-full'>
                        <label>Background color</label>
                        <Input
                            type="color"
                            name="backgroundColor"
                            value={category?.backgroundColor}
                            onChange={onChange}
                        />
                    </div>
                    <div className='w-full'>
                        <label>Text color</label>
                        <Input
                            type="color"
                            name="textColor"
                            value={category?.textColor}
                            onChange={onChange}
                        />
                    </div>
                </div>
        </form>
    )
}

export default CategoriesForm