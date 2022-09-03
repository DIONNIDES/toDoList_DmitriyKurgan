import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@mui/material';

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
            <TextField label="Standard" variant="standard" value={title} onChange={onTitleChangeHandler} autoFocus onBlur={activateViewMode}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
};

