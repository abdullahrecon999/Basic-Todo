import { Input, Button } from 'antd';

export const InputBox = ({ handleSubmit, handleTaskTitleChange, taskTitle}) => {
    return (
        <div className="input-container">
            <Input
                value={taskTitle}
                onChange={handleTaskTitleChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit();
                    }
                }}
                className="task-input"
                placeholder="Enter Task"
            />
            <Button onClick={handleSubmit} className="add-button" type="primary">Add</Button>
        </div>
    );
}