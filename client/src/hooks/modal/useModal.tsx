import { Modal } from '@shared/components'
import React, { useState } from 'react'

type useModalProps = {
    title: string
    save: any
    modalBtns: boolean
    content: any
    onSave?: any
    onCancel?: any
}

const useModal = ({
    title,
    save,
    modalBtns,
    content,
    onSave,
    onCancel
}: useModalProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    const confirm = () => {
        save()
        if(onSave != undefined){
            onSave()
        }
    }

    const cancel = () => {
        closeModal()
        if(onCancel != undefined){
            onCancel()
        }
    }


    const modal = (
        <Modal
            title={title}
            open={open}
            cancel={cancel}
            footerBtns={modalBtns}
            confirm={confirm}
        >
            {content}

        </Modal>
    )

    return {
        modal,
        openModal,
        closeModal
    }
}

export default useModal