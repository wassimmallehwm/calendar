import React from 'react'

interface ButtonProps {
    color: string
    outline?: boolean
    rounded?: boolean
    submit?: boolean
    small?: boolean
    margin?: boolean
    children?: any
    [x:string]: any;
}

const Button = ({ 
    color,
    outline,
    rounded,
    submit,
    small,
    margin = true,
    children,
    ...props 
}: ButtonProps) => {

    const btnPadd = rounded ? 'px-2 py-2' : small ? 'px-2 py-1 h-7' : 'px-4 py-2 h-9'
    const btnMargin = margin ? 'mx-1' : 'mx-0'
    const btnClass = outline ?
    `text-${color}-500 border border-${color}-500 hover:bg-${color}-50 font-bold uppercase text-xs ${btnPadd} ${rounded ? 'rounded-full' : 'rounded'} shadow-lg hover:shadow-2xl outline-none focus:outline-none ${btnMargin} ease-linear transition-all duration-150 disabled:text-gray-400 disabled:cursor-not-allowed`
    : `bg-${color}-600 text-white hover:bg-${color}-400 font-bold uppercase text-xs ${btnPadd} ${rounded ? 'rounded-full' : 'rounded'} shadow-lg hover:shadow-2xl outline-none focus:outline-none ${btnMargin} ease-linear transition-all duration-150 disabled:text-gray-400 disabled:cursor-not-allowed`
    return(
        <button {...props} className={btnClass} type={`${submit ? "submit" : "button"}`}>
            {children}
        </button>
    )
}

export default Button
