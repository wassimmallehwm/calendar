import React from 'react'
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select'

const MultipleSelect = ({
    isLoading,
    id = "multiselect",
    placeholder,
    options,
    labelKey = (option: any) => `${option}`,
    renderMenuItemChildren = (option: any) => <span>{option}</span>,
    onChange,
    onInputChange,
    selected,
    filterBy = () => true
}: any) => {
    return (
        <Select
            value={selected}
            isMulti
            isLoading={isLoading}
            isClearable={true}
            name={placeholder}
            className="basic-multi-select"
            classNamePrefix="select"
            getOptionLabel={labelKey}
            onChange={onChange}
            options={options}
        />
    )
}

export default MultipleSelect
