import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth/AuthContext'
import Navbar from './navbar/Navbar'

const Layout = ({ children }: any) => {
    const { user } = useContext(AuthContext)
    return user ? (
        <>
            <Navbar />
            <main className='pt-12'>
            {children}
            </main>
        </>
    ) : children
}

export default Layout
