import React, { useContext, useEffect, useState } from 'react'
import { settingsService } from '@modules/settings'
import { appImage } from '@utils/filePath'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import { AuthContext, SettingsContext, SocketContext } from '@contexts/index'

const Layout = ({ children }: any) => {
    const { user } = useContext(AuthContext)
    const { socket, connect, disconnect } = useContext(SocketContext)
    const { settings, setSettings } = useContext(SettingsContext)
    const [isSidebarOpen, openSidebar] = useState<boolean>(false)


    const importSettings = () => {
        settingsService.find().then(
            res => {
                setSettings(res.data)
            },
            error => console.error(error)
        )
    }

    useEffect(() => {
        importSettings()

        if (user) {
            disconnect()
            connect(user)
        }

        return () => {
            disconnect()
        }
    }, [])

    useEffect(() => {
        if (socket) {
            console.log(socket)
            socket?.on('notif', data => console.log("NOTIF : ", data))
        }

        return () => {
            socket?.off('notif')
        }
    }, [socket])

    const toggleSidebar = () => {
        openSidebar(prev => !prev)
    }
    return (
        <>
            {
                user ? (
                    <>
                        <Navbar toggleSidebar={toggleSidebar} />
                        <Sidebar isOpen={isSidebarOpen} close={() => openSidebar(false)}></Sidebar>
                        {
                            isSidebarOpen && <div onClick={() => openSidebar(false)} className='top-0 left-0 w-full h-full fixed bg-black bg-opacity-40 z-10'></div>
                        }
                    </>
                ) : null
            }

            <main className='bg-slate-50 fixed w-full h-full overflow-auto'>
                {children}
            </main>
        </>
    )
}

export default Layout
