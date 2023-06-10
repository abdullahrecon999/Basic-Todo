import { useState } from 'react'
import { Checkbox, Dropdown, Spin, message, Input, Button, Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ReactSortable } from "react-sortablejs";
import { useQuery } from 'react-query';
import { createTask, deleteTask, getTasks, uncheckTask, checkTask } from './services/apiService';
import { PopoverComponent } from './components/popover';
import './App.css'

function App() {
	const [messageApi, contextHolder] = message.useMessage();
	const [taskTitle, setTaskTitle] = useState("");
	const [data, setData] = useState([]);
	const [activeMenuId, setActiveMenuId] = useState(null);

	const handleTaskTitleChange = (e) => {
		setTaskTitle(e.target.value);
	};

	const handleSubmit = async () => {
		if (taskTitle === "") {
			messageApi.error("Task title cannot be empty");
			return;
		}
		console.log("Task Title: ", taskTitle);
		try {
			const response = await createTask(taskTitle);
			setData([...data, response.data]);
			setTaskTitle("");
		} catch (error) {
			console.log(error);
			throw new Error("Error while adding task");
		}
		// setData([...data, { id: "10", text: taskTitle }]);
	};

	const handleDelete = async (id) => {
		console.log("Delete Task: ", id);
		try {
			await deleteTask(id);
			messageApi.success("Task deleted successfully");
			setData(data.filter((item) => item._id !== id));
		} catch (error) {
			console.log(error);
			throw new Error("Error while deleting task");
		}
		// setData(data.filter((item) => item.id !== id));
	};

	const { data: todos, isLoading, isError, isSuccess } = useQuery('todos', async () => {
		try {
			const response = await getTasks();
			console.log("RESPONSE: ", response.data)
			setData(response.data);
			return response.data;
		} catch (error) {
			console.log(error);
			throw new Error("Error while fetching data");
		}
	});

	const handleCheckboxChange = async (id, status) => {
		// Handle checkbox change logic
		console.log("Checkbox Change: ", id);

		try {
			if (status === "checked") {
				await uncheckTask(id);
			} else {
				await checkTask(id);
			}

			messageApi.success("Task updated successfully");

			setData((prevData) =>
				prevData.map((item) => {
					if (item._id === id) {
						if (status === "checked") {
							item.status = "active";
						} else {
							item.status = "checked";
							item.checkedAt = new Date().toISOString();
						}
					}
					return item;
				})
			);
		} catch (error) {
			console.log(error);
			messageApi.error("Error while updating task");
		}
	};

	const handleDropdownVisibleChange = (visible, menuId) => {
		if (!visible) {
			setActiveMenuId(null);
		} else {
			setActiveMenuId(menuId);
		}
	};

	return (
		<div className="app-bg">
			{contextHolder}
			<div className='container'>
				<Avatar className="avatar" size={80} icon={<img src="https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY=" />} />

				<div className="task-container">
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

					{
						isLoading ? (
							<div className="loading-container">
								<Spin />
							</div>
						) : (
							isError ? (
								<div className="empty-container">
									<p>No Tasks Found</p>
								</div>
							) : (
								isSuccess && (
									<div className="tasks-list">
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
												<PopoverComponent creationTime={item.createdAt} completedTime={item.checkedAt} placement='left' key={item._id}>
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
														<div key={item._id} className="task-item">
															<div className="task-details">
																<div className='task-container2'>
																	<Checkbox
																		checked={item.status == 'checked'}
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
											))}
										</ReactSortable>
									</div>
								)
							)
						)
					}
				</div>
			</div>
		</div>
	)
}

export default App