import React, { ChangeEvent, useContext, useRef, useState } from 'react'
import { SettingsContext } from '@contexts/settings/SettingsContext'
import { appImage } from '@utils/filePath'
import settingsService from '@modules/settings/services/settings.service'
import { showToast, toastError } from '@utils/toast'
import { Settings } from '@shared/types'
import { Button } from '@shared/components'

const AppSettings = () => {

  const { settings, setSettings } = useContext(SettingsContext)
  const [fileType, setFileType] = useState<string>('')
  const [currentSettings, setCurrentSettings] = useState<Settings | null>(settings)
  const fileRef = useRef<any>()

  const onChange = (e: any) => {
    setCurrentSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const onSave = async () => {
    try {
      const { data } = await settingsService.update(currentSettings!)
      setSettings(data)
      /* document.title = data.name || 'Calendar'
      document.head.getElementsByTagName('link').item(0)?.setAttribute('href', appImage(data.logo!)) */
    } catch {
      toastError('Action failed')
    } finally {
      setFileType('')
    }
  }

  const onLogoClick = () => {
    setFileType('logo')
    fileRef.current.click()
  }

  const onCoverClick = () => {
    setFileType('cover')
    fileRef.current.click()
  }

  const onChangeFile = async (e: any) => {
    let file = e.target.files[0];
    if (fileType === 'logo') {
      let formdata = new FormData()
      formdata.append('logo', file)
      try {
        const { data } = await settingsService.updateLogo(formdata)
        setSettings({ ...settings, logo: data.logo })
        /* document.head.getElementsByTagName('link').item(0)?.setAttribute('href', appImage(data.logo!)) */
      } catch {
        toastError('Action failed')
      } finally {
        setFileType('')
      }
    }
  }


  return (
    <div className='main-div'>
      <input ref={fileRef} onChange={onChangeFile} type="file" className='hidden' />
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

      <div className='p-4 m-4'>
        
        <div className='flex items-center justify-between gap-4'>
          
          <div>
            <label className="text-sm font-bold text-gray-600 block">
              App name
            </label>
            <input type="text" name="name" value={currentSettings?.name} onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>

        </div>

        <div className='py-4 my-4 flex justify-end'>
          <Button color='primary' outline onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AppSettings