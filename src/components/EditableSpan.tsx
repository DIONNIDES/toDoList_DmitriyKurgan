import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const {title, callBack} = props
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitleTitle] = useState(title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleTitle(e.currentTarget.value)
    }

    const addTask = () => {
        callBack(newTitle);
    }


    const toggleHandler = () => {
        setEdit(!edit)
        addTask()
    }

    return (
        edit
            ? <input onBlur={toggleHandler}  onChange={onChangeHandler} autoFocus value={newTitle}/>
            : <span onDoubleClick={toggleHandler}>{props.title}</span>
    );
};

