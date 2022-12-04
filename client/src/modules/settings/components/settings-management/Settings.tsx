import React, { useContext, useRef, useState } from 'react'
import { SettingsContext } from '@contexts/settings/SettingsContext'
import { appImage } from '@utils/filePath'
import settingsService from '@modules/settings/services/settings.service'
import { showToast, toastError } from '@utils/toast'

const Settings = () => {

  const { settings, setSettings } = useContext(SettingsContext)
  const [fileType, setFileType] = useState<string>('')
  const fileRef = useRef<any>()

  const onLogoClick = () => {
    setFileType('logo')
    fileRef.current.click()
  }

  const onChange = async (e: any) => {
    let file = e.target.files[0];
    if (fileType === 'logo') {
      let formdata = new FormData()
      formdata.append('logo', file)
      try {
        const { data } = await settingsService.updateLogo(formdata)
        setSettings({ ...settings, logo: data.logo })
        document.head.getElementsByTagName('link').item(0)?.setAttribute('href', appImage(data.logo!))
      } catch {
        toastError('Action failed')
      } finally {
        setFileType('')
      }
    }
  }

  const onCoverClick = () => {
    setFileType('cover')
    fileRef.current.click()
  }


  return (
    <div className='main-div'>
      <input ref={fileRef} onChange={onChange} type="file" className='hidden' />
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