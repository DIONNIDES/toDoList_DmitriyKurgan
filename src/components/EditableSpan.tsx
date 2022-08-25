import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type PropsType = {
    title:string
    callback:(value:string)=>void
}

export const EditableSpan = (props: PropsType) => {
    const [editMode,setEditMode] = useState(false);
    const [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.callback(title);
    }

    const onTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
    }
    return (editMode ?
            <input  value={title} onChange={onTitleChangeHandler} autoFocus onBlur={activateViewMode}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
};

