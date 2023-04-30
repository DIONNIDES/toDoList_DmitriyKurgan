import React, {memo, useCallback} from 'react';
import {CheckboxComponent} from '../../../../components/CheckBox/CheckboxComponent';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {useDispatch} from 'react-redux';
import {TaskStatuses} from '../../../../api/todolistAPI';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {RequestedStatusType} from '../../../../app/appReducer';
import {TaskType, useDeleteTaskMutation, useUpdateTaskMutation} from "../../../../api/taskAPI";

type TaskPropsType = {
    todolistID: string
    task: TaskType
    entityStatus: RequestedStatusType
}

export const TaskWithRedux = memo(({todolistID, task, entityStatus}: TaskPropsType) => {
        const [deleteTask, {}] = useDeleteTaskMutation();
        const [updateTask, {}] = useUpdateTaskMutation();


        const dispatch = useDispatch();
        const onClickHandler = useCallback(async () => {
            await deleteTask({todolistId: todolistID, taskID: task.id})
        }, [dispatch])
        const onTitleChangeHandler = useCallback(async (title: string) => {
            await updateTask({todolistID: todolistID, taskID: task.id, domainModel: {title}})
        }, [todolistID, task.id])
        const onChangeTaskStatusHandler = useCallback(async (newIsDoneValue: boolean) => {
            let status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
            await updateTask({todolistID: todolistID, taskID: task.id, domainModel: {status}})
        }, [todolistID, task.id]);

        return (
            <li key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <CheckboxComponent callback={onChangeTaskStatusHandler} checked={task.status === TaskStatuses.Completed}/>
                <EditableSpan value={task.title} onChange={(value) => onTitleChangeHandler(value)}
                              disabled={entityStatus === 'loading'}/>
                <IconButton onClick={onClickHandler}>
                    <Delete/>
                </IconButton>
            </li>
        );
    }
)





