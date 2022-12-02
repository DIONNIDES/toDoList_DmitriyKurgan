import React, {ChangeEvent} from 'react';
import {Checkbox} from '@mui/material';

export type PropsType = {
    checked: boolean
    callback: (checked: boolean) => void
}

export const CheckboxComponent = (props: PropsType) => {

    const {checked, callback} = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
    }
    return (
        <Checkbox
            checked={checked}
            color="primary"
            onChange={onChangeHandler}
        />
    );
};

