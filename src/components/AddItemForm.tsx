import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { IconButton, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export type PropsType = {
    callback: (newTitle: string) => void
}

export const AddItemForm = (props: PropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            props.callback(newTitle);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    return (
        <div>
            <TextField value={title}
                       label={'Type value...'}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       variant={'outlined'}
                       style={{borderRadius: '5px'}}
                       helperText={error}
            />
            <IconButton onClick={addTask} color={'primary'}>
               <AddIcon/>
            </IconButton>

        </div>
    );
};
