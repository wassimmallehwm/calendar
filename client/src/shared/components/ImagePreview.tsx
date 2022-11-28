import React from 'react'

type ImagePreviewProps = {
    src: string
    tag?: string
}

const ImagePreview = ({
    src,
    tag
}: ImagePreviewProps) => {
    return (
        <div className='rounded shadow-lg relative'>
            {
                tag && <span className='absolute top-2 left-2 bg-primary-600 text-slate-50 py-1 px-2 rounded-lg bg-opacity-90'>
                    tag
                </span>
            }
            <img className='h-full w-full' src={src} />
        </div>
    )
}

export default ImagePreview