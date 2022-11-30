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
import { Dropdown } from '@shared/components'
import { DropdownItem } from '@shared/types'



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

    const dropdownItems: DropdownItem[] = [
        {
            label: 'Sign out',
            action: onLogout
        }
    ]
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
                    <Dropdown trigger={(
                        <img className="h-8 w-8 rounded-full" src={userImage("user_default")} alt="user" />
                    )}
                        items={dropdownItems}
                    />
                    {/* <Menu as="div" className="ml-3 relative">
                        <div>
                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-slate-50">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src={userImage("user_default")} alt="user" />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                        {({ active }) => (
                                            <a
                                                onClick={item.click}
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu> */}
                    {/* <button className="p-1 flex items-center text-slate-50"
                        onClick={onLogout}
                        title="Sign out"
                        tabIndex={1}
                    >
                        <FaSignOutAlt className="text-slate-50 mx-1" size="25px" />
                        Sign out
                    </button> */}
                </div>

            </div>
        </header>
    )
}

export default Navbar