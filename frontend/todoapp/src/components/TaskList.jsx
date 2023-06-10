import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import TaskItem from './TaskItem';

const TaskList = ({ data, handleCheckboxChange, handleDelete, activeMenuId, handleDropdownVisibleChange, setData }) => {
  return (
    <ReactSortable
      list={data}
      setList={setData}
      animation={200}
      easing="ease-out"
      scroll={true}
      scrollSpeed={20}
      scrollSensitivity={100}
    >
      {data.map((item, index) => (
        <TaskItem
          key={item._id}
          item={item}
          handleCheckboxChange={handleCheckboxChange}
          handleDelete={handleDelete}
          activeMenuId={activeMenuId}
          handleDropdownVisibleChange={handleDropdownVisibleChange}
        />
      ))}
    </ReactSortable>
  );
};

export default TaskList;