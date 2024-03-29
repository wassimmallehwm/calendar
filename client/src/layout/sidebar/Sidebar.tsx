import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '@contexts/auth/AuthContext'
import logo from '@assets/logo.png'
import { useTranslation } from 'react-i18next'
import { FaTimes } from 'react-icons/fa'
import { appImage } from '@utils/filePath'
import { SettingsContext } from '@contexts/settings/SettingsContext'
import { Config } from '@config/Config'

interface SidebarProps {
  isOpen: boolean
  close: any
}

const Sidebar = ({
  isOpen,
  close
}: SidebarProps) => {
  const { user } = useContext(AuthContext)
  const { settings } = useContext(SettingsContext)
  const { t } = useTranslation();

  const initMenus = () => {
    const role = user ? user?.role?.label : "GUEST"
    const result = Config.getMenu().filter((menu: any) => menu.roles.find((elem: string) => elem == role) != undefined)
    return result
  }

  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} ease-in-out duration-300 top-0 left-0 fixed h-screen w-60 bg-slate-100 z-20`}>
      <div className='flex items-center justify-end'>
        <button className="w-10 p-1 md:hidden"
          onClick={close}
          title="Toggle menu"
          tabIndex={1}
        >
          <FaTimes className="text-black" size="25px" />
        </button>
      </div>
      <Link to="/">
        <img src={appImage(settings?.logo!)} className="w-36 mx-auto text-center" />
        <div className="my-2 text-xl font-bold text-gray-800 text-center">
          {settings?.name}
        </div>
      </Link>
      <hr />
      {
        initMenus().map((menu: any) => (
          <NavLink key={menu.label} to={menu.url}>
            <li className="p-3 cursor-pointer rounded-sm flex items-center justify-between hover:bg-gray-200">
              <span className="mx-4"> {t(`titles.${menu.label}`)} </span>
            </li>
          </NavLink>
        ))
      }
    </div>
  )
}

export default Sidebar