import React, { lazy, useContext, useState } from 'react'
import { useEffect } from 'react'
import { AuthContext } from 'src/contexts'
import { hasRole } from 'src/utils'
import GuestHome from './guest-home/GuestHome';

const AdminHome = lazy(() => import('./admin-home/AdminHome'));

const Home = () => {
  const { user } = useContext(AuthContext)
  const [homePage, setHomePage] = useState<string>('GUEST')


  const initHomePage = () => {
    if(user && user.role){
      if (user.role.label == "ADMIN") {
        setHomePage("ADMIN")
      }
    } else {
      setHomePage("GUEST")
    }
  }

  useEffect(() => {
    initHomePage()
  }, [user])

  const pageContent = () => {
    switch (homePage) {
      case "ADMIN":
        return <AdminHome />
      default: 
        return <GuestHome/>

    }
  }

  return pageContent()
}

export default Home