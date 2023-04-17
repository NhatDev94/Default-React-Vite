import React from 'react'
import { Form as FormAntd, Upload, message } from 'antd'


const Form = ({
  form,
  columns = [],
  values = []
}) => {


  const getValueFromEvent = (e, col) => {
    window.timer && clearTimeout(window.timer)
    const oldValue = form.getFieldValue(col?.name) || []
    if (Array.isArray(e)) {
      return e
    }
    const fileList = e?.fileList || []
    let allowUpload = true
    const maxSize = col?.formItem?.maxSize || 2
    fileList?.map(file => {
      if (file?.size >= maxSize * 1024 * 1024) {
        allowUpload = false
      }
    })
    if (!allowUpload) {
      window.timer = setTimeout(() => {
        message.error(`File không quá ${maxSize}MB`, 1)
      }, 200)
      return oldValue
    }
    return fileList
  }

  const renderInput = col => {
    switch (col?.formItem?.type) {
      case 'upload':
        return (
          <Upload
            listType='picture'
            maxCount={col?.maxCount || 2}
            multiple={col?.formItem?.mutiple}
          >
            <div className='px-4 h-8 rounded-sm border border-black/10 flex items-center justify-center'>Upload File</div>
          </Upload>
        )
      default:
        return (
          <Input />
        )
    }
  }

  const renderFormItem = (col, index) => {
    const props = {}
    switch (col?.formItem?.type) {
      case 'upload':
        props.valuePropName = 'fileList'
        props.getValueFromEvent = e => getValueFromEvent(e, col)
      default:
        break
    }

    return (
      <FormAntd.Item
        key={index}
        label={col?.title}
        name={col?.name}
        {...props}
      >
        {renderInput(col)}
      </FormAntd.Item>
    )
  }

  return (
    <FormAntd
      form={form}
      values={values}
    >
      {
        columns?.map((column, index) => renderFormItem(column, index))
      }
    </FormAntd>
  )
}

export default Form
