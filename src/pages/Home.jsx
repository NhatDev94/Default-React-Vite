import React from 'react'
import { Form as FormAntd } from 'antd'
import { Form } from '../components'

const Home = () => {
    const [form] = FormAntd.useForm()

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
    return (
        <div className='w-screen h-screen p-4'>
            <div className=' w-80 h-fit p-4 border border-black/10 rounded-md shadow-md'>
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
