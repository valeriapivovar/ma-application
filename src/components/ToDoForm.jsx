import React from 'react';
import { Form, Input, Button } from 'antd';
import { ToastProvider, useToasts } from 'react-toast-notifications';


function checkCase(ch) {
  if (!isNaN(ch * 1)){
     return false;
  }
   else {
     if (ch == ch.toUpperCase()) {
        return true;
     }
     if (ch == ch.toLowerCase()){
        return false;
     }
  }
}


export const ToDoForm = (props) => {
  const { addToast } = useToasts();
  const { onSubmit } = props;
  const [form] = Form.useForm();
  const onFinish = (values) => {
    if (onSubmit) {
      if(values.title)
      {
        var titleString = String(values.title);
        var descriptionString = String(values.description);

        if(titleString.length>3)
      {
        if(checkCase(descriptionString[0])){
        onSubmit(values.title, values.description + GetTime());
      }
      else {
        addToast('Description should has first capital letter', { appearance: 'error' });
      }
    }
      else
      {
        addToast('Title should has Length > 3', { appearance: 'error' });
      }
      }
    }
    form.resetFields();
  }

  return (
    <Form className="todo-form" form={form} layout={'inline'} onFinish={onFinish}>
      <Form.Item name="title" className="todo-form-input">
        <Input placeholder={'New todo'} />
      </Form.Item>
      <Form.Item name="description" className="todo-form-input">
        <Input placeholder={'description'} />
      </Form.Item>
      <Form.Item className="todo-form-actions">
        <Button htmlType="submit" type="primary">Add</Button>
      </Form.Item>
    </Form>
  )
  function GetTime()
  {
    var today = new Date();
    var result = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear() +" - " + 
     today.getHours() + ':' + today.getMinutes() +':' + today.getSeconds();
     return result;
  }
}
