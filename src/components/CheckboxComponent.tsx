import React, {ChangeEvent} from 'react';

export type PropsType = {
    checked:boolean
    callback:(checked:boolean)=>void
}

export const CheckboxComponent = (props:PropsType) => {

    const {checked,callback} = props

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        callback(e.currentTarget.checked)
    }
    return (
      <input type='checkbox' onChange={onChangeHandler} checked={checked}/>
    );
};

