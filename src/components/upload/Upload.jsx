import React from 'react'
import { Upload as UploadAntd, message } from 'antd'

const Upload = ({
    children,
    multiple = true,
    maxCount = 1,
    maxSize = 2,
    listType = 'picture',
    showUploadList = true,
    onChange,
}) => {

    const checkSizeFileUpload = (files, maxSize) => {
        let allowUpload = true
        files?.forEach(item => {
            if (item?.size >= maxSize * 1024 * 1024) {
                allowUpload = false
                message.error(`File không vượt quá ${maxSize}MB`, 1)
            }
        })
        return allowUpload
    }

    const handleChange = async ({ file, fileList }) => {
        const promises = fileList?.map(item => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = e => {
                    item.base64 = e?.target?.result
                    resolve(item)
                }
                reader.readAsDataURL(item?.originFileObj)
            })
        })
        const files = await Promise.all(promises)
        const allowUpload = checkSizeFileUpload(files, maxSize)
        if (!allowUpload) return
        onChange(files)
    }

    return (
        <UploadAntd
            multiple={multiple}
            maxCount={maxCount}
            listType={listType}
            showUploadList={showUploadList}
            onChange={handleChange}
            beforeUpload={e => {
                // Có beforUpload thì upload ko bị lặp nhiều lần
                return new Promise((resolve, reject) => {
                    reject()
                })
            }}
        >
            {
                children ? children : (
                    <div className='px-4 h-8 rounded-sm border border-black/10 flex items-center justify-center'>Upload File</div>
                )
            }
        </UploadAntd>
    )
}

export default Upload
