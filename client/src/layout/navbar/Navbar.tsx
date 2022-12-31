import React, { Fragment, useContext, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '@contexts/auth/AuthContext'
import { FaBars, FaSignOutAlt } from 'react-icons/fa'
import { SocketContext } from '@contexts/socket/SocketContext'
import { showToast, showNotif } from '@utils/toast'
import toast from 'react-hot-toast'
import { userImage } from '@utils/filePath'
import { useTranslation } from 'react-i18next'
import { Config } from '@config/Config'
import { Button, Dropdown } from '@shared/components'
import { DropdownItem } from '@shared/types'
import { Account } from '@modules/users/models/Account'



interface NavbarProps {
    toggleSidebar: any
}

const Navbar = ({
    toggleSidebar
}: NavbarProps) => {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const { t } = useTranslation();

    const initMenus = () => {
        const role = user ? user?.role?.label : "GUEST"
        const result = Config.getMenu().filter((menu: any) => menu.roles.find((elem: string) => elem == role) != undefined)
        return result
    }

    const onLogout = () => {
        logout()
        navigate('/')
    }

    const toProfil = () => {
        navigate('/profile')
    }

    const dropdownItems = (user: Account): DropdownItem[] => {
        return [
            {
                component: (
                    <div className="flex items-center gap-4">
                        <img className="h-8 w-8 rounded-full" src={userImage(user?.imagePath!)} alt={user?.displayName} />
                        {user?.displayName}
                    </div>
                ),
                action: toProfil
            },
            {
                label: 'Sign out',
                action: onLogout
            }
        ]
    }
    return (
        <header className="bg-slate-50 shadow-md h-16 flex items-center justify-center w-full border-b-2 border-b-gray-200">
            <div className="flex flex-grow items-center justify-between px-4 h-full">
                <div className='flex items-center justify-center'>
                    <button className="w-10 p-1 md:hidden"
                        onClick={toggleSidebar}
                        title="Toggle menu"
                        tabIndex={1}
                    >
                        <FaBars className="text-black" size="25px" />
                    </button>
                    <Link to="/">
                        BRAND
                    </Link>
                </div>
                <ul className='hidden md:flex items-center justify-center h-full'>
                    {
                        initMenus().map((menu: any) => (
                            <NavLink className="h-full"
                                key={menu.label} to={menu.url}>
                                <li className="px-2 h-full cursor-pointer rounded-sm flex items-center justify-between hover:bg-gray-200">
                                    <span className="mx-4"> {t(`titles.${menu.label}`)} </span>
                                </li>
                            </NavLink>
                        ))
                    }
                </ul>
                <div className='flex items-center gap-4'>
                    {
                        user ? (
                            <Dropdown trigger={(
                                <img className="h-8 w-8 rounded-full" src={userImage("user_default")} alt="user" />
                            )}
                                items={dropdownItems(user!)}
                            />
                        ) : (
                            <Button color='primary' onClick={() => navigate('/login')}>
                                Login
                            </Button>
                        )
                    }
                </div>

            </div>
        </header>
    )
}

export default Navbar