import React, { useContext, useEffect, useState } from 'react'
import { SettingsContext } from '@contexts/settings/SettingsContext'
import { settingsService } from '@modules/settings'
import { appImage } from '@utils/filePath'
import { AuthContext } from '@contexts/auth/AuthContext'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'

const Layout = ({ children }: any) => {
    const { user } = useContext(AuthContext)
    const { settings, setSettings } = useContext(SettingsContext)
    const [isSidebarOpen, openSidebar] = useState<boolean>(false)


    const importSettings = () => {
        settingsService.find().then(
            res => {
                setSettings(res.data)
                document.title = res.data.name || 'Calendar'
                document.head.getElementsByTagName('link').item(0)?.setAttribute('href', appImage(settings?.logo!))
            },
            error => console.error(error)
        )
    }

    useEffect(() => {
        importSettings()
    }, [])

    const toggleSidebar = () => {
        openSidebar(prev => !prev)
    }
    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} close={() => openSidebar(false)}></Sidebar>
            {isSidebarOpen && <div onClick={() => openSidebar(false)} className='top-0 left-0 w-full h-full fixed bg-black bg-opacity-40 z-10'></div>}

            <main className='bg-slate-50 fixed w-full h-full overflow-auto'>
                {children}
            </main>
        </>
    )
}

export default Layout
