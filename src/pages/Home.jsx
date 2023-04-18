import React, { useState } from 'react'
import { Form as FormAntd } from 'antd'
import { Form } from '../components'
import Upload from '../components/upload/Upload'

const Home = () => {
    const [form] = FormAntd.useForm()
    const [avatar, setAvatar] = useState(null)

    const cols = [
        {
            title: 'Gallery',
            name: 'galery',
            formItem: {
                type: 'upload',
                mutiple: true,
            }
        }
    ]

    const onSubmit = async () => {
        const value = await form.getFieldsValue()
        console.log(value);
    }

    const handleUpload = (fileList) => {
        if (fileList) {
            setAvatar(fileList[0]?.base64)
        }
    }

    return (
        <div className='w-screen h-screen p-4 pt-20'>

            <div className='mb-10 shadow-sm rounded-sm p-4 w-80 h-fit mx-auto border relative'>
                <div className='w-20 h-20 rounded-full overflow-hidden shadow-sm border-[3px] border-black/50 mx-auto'>
                    {
                        avatar && <img src={avatar} alt='avatar' className='w-full h-full object-cover' />
                    }
                </div>
                <div className='absolute bottom-[20px] left-[200px]'>
                    <Upload
                        multiple={false}
                        showUploadList={false}
                        onChange={handleUpload}
                    >
                        <p className='text-xs font-semibold text-black rounded-sm border-black/10 border px-1 py-0.5 cursor-pointer hover:bg-black/10'>Edit</p>
                    </Upload>
                </div>
            </div>

            <div className=' w-80 h-fit p-4 border border-black/10 rounded-sm shadow-md mx-auto'>
                <h4 className='w-full text-center font-semibold mb-4'>Form</h4>
                <Form columns={cols} form={form} />
                <p
                    className='mt-10 w-full h-8 rounded-sm border border-black/10 flex items-center cursor-pointer hover:bg-gray-200 justify-center'
                    onClick={onSubmit}
                >Submit</p>
            </div>
        </div>
    )
}

export default Home
