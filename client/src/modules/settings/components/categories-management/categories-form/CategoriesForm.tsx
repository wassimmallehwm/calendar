import React from 'react'
import { Category } from '@modules/settings/models/Category'


interface CategoriesFormProps {
    category: Category,
    onChange: any
}

const CategoriesForm = ({
    category,
    onChange
}: CategoriesFormProps) => {
    return (
        <form action="" className="space-y-6">
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Label
                </label>
                <input type="text" name="label" value={category?.label} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
        </form>
    )
}

export default CategoriesForm