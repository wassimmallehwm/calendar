import React, { useContext, useRef, useState } from 'react'
import { SettingsContext } from '@contexts/settings/SettingsContext'
import { appImage } from '@utils/filePath'

const Settings = () => {

  const { settings } = useContext(SettingsContext)
  const [file, setFile] = useState<string>('')
  const fileRef = useRef<any>()

  const onLogoClick = () => {
    setFile('logo')
    fileRef.current.click()
  }

  const onCoverClick = () => {
    setFile('cover')
    fileRef.current.click()
  }


  return (
    <div className='main-div'>
      <input ref={fileRef} type="file" className='hidden'/>
      <div className='flex items-center justify-evenly flex-wrap gap-4'>
        <div onClick={onLogoClick} className='w-52 md:w-1/4 flex flex-col justify-center items-center gap-4 bg-white rounded p-4 cursor-pointer'>
          <span className='text-2xl font-bold text-gray-800'>Logo</span>
          <img src={appImage(settings?.logo!)} className="h-32 text-center" />
        </div>
        <div onClick={onCoverClick} className='w-52 md:w-1/4 flex flex-col justify-center items-center gap-4 bg-white rounded p-4 cursor-pointer'>
          <span className='text-2xl font-bold text-gray-800'>Cover</span>
          <img src={appImage(settings?.cover!)} className="h-32 text-center" />
        </div>
        
      </div>
    </div>
  )
}

export default Settings