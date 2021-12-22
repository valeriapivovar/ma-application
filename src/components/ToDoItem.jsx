import React from 'react';
import {Button, Checkbox, Input} from 'antd';
import Collapsible from 'react-collapsible';
import {IoTrashBin, IoPencil, IoClose, IoCheckmark} from "react-icons/io5"
import Time from 'react-time-format'

export const ToDoItem = (props) => {
    const {item, onCheck, onRemove, toggleEdit, onEdit} = props;
    let input = React.createRef();

    const onRemoveItem = (e) => {
        e.preventDefault();

        if (onRemove) {
            onRemove(item.id);
        }
    }

    const toggleEditItem = (e) => {
        e.preventDefault();

        if (toggleEdit) {
            toggleEdit(item.id);
        }
    }

    const onEditItem = (e) => {
        e.preventDefault();
        if (onEdit) {
            onEdit(item.id, input.current.state.value);
        }
    }

    const onCheckItem = () => {
        if (onCheck) {
            onCheck(item.id);
        }
    }

    let triggerStyle = {};

    if (item.checked) {
        triggerStyle = {
            textDecoration: 'line-through',
            textAlign: 'left'
        }
    }

    if (item.edited) {
        return (
            <li className="todo-item" key={item.id} style={{backgroundColor: item.checked ? '#B0E0E6' : '#fff'}}>
                <Checkbox className="checkBox" checked={item.checked} onChange={onCheckItem}></Checkbox>
                <div className="inline-editor">
                    <Input placeholder={'New name'} defaultValue={item.content} ref={input}/>
                </div>
                <div className="controls">
                    <Button onClick={onEditItem}>
                        <IoCheckmark/>
                    </Button>
                    <Button danger onClick={toggleEditItem}>
                        <IoClose/>
                    </Button>
                </div>
            </li>
        )
    }

    return (
        <li className="todo-item" key={item.id} style={{backgroundColor: item.checked ? '#B0E0E6' : '#fff'}}>
            <Checkbox className="checkBox" checked={item.checked} onChange={onCheckItem}></Checkbox>
            <Collapsible trigger={item.content} triggerStyle={triggerStyle}>
                <div>
                    <div>
                        <span className="lineHeader">Description:</span> {item.description}
                    </div>
                    <div>
                        <span className="lineHeader">Created At:</span> <Time className="created" value={new Date(item.created)} format="DD.MM.YYYY – hh:mm"/>
                    </div>
                </div>
            </Collapsible>
            <div className="controls">
                <Button onClick={toggleEditItem}>
                    <IoPencil/>
                </Button>
                <Button danger onClick={onRemoveItem}>
                    <IoTrashBin/>
                </Button>
            </div>
        </li>
    )
}