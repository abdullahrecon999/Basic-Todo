import React from 'react';
import { Checkbox, Dropdown } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { PopoverComponent } from './popover';
import '../App.css';

const TaskItem = ({ item, handleCheckboxChange, handleDelete, activeMenuId, handleDropdownVisibleChange }) => {
  return (
    <PopoverComponent creationTime={item.createdAt} completedTime={item.checkedAt} placement='left'>
      <Dropdown
        key={item._id}
        menu={{
          items: [
            {
              key: '1',
              label: 'Delete',
              icon: <DeleteOutlined />,
              danger: true,
              onClick: () => handleDelete(item._id)
            },
          ]
        }}
        trigger={['contextMenu']}
        visible={activeMenuId === item._id}
        onVisibleChange={(visible) => handleDropdownVisibleChange(visible, item._id)}
      >
        <div className="task-item">
          <div className="task-details">
            <div className='task-container2'>
              <Checkbox
                checked={item.status === 'checked'}
                className='checkBox'
                style={{ marginRight: '10px' }}
                onChange={() => handleCheckboxChange(item._id, item.status)}
              />
              <span className="task-title">{item.title}</span>
            </div>
            <div className="drag-icon">
              <svg height="18" width="18" viewBox="0 0 24 24"><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z" fill="currentColor"></path></svg>
            </div>
          </div>
        </div>
      </Dropdown>
    </PopoverComponent>
  );
};

export default TaskItem;