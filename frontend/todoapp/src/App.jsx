import { useState } from 'react'
import { Spin, message } from 'antd';
import { useQuery } from 'react-query';
import { createTask, deleteTask, getTasks, uncheckTask, checkTask } from './services/apiService';
import { AvatarComponent } from './components/Avatar';
import { InputBox } from './components/InputBox';
import TaskList from './components/TaskList';
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
		try {
			const response = await createTask(taskTitle);
			setData([...data, response.data]);
			setTaskTitle("");
		} catch (error) {
			console.log(error);
			throw new Error("Error while adding task");
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteTask(id);
			messageApi.success("Task deleted successfully");
			setData(data.filter((item) => item._id !== id));
		} catch (error) {
			console.log(error);
			throw new Error("Error while deleting task");
		}
	};

	const { data: todos, isLoading, isError, isSuccess } = useQuery('todos', async () => {
		try {
			const response = await getTasks();
			setData(response.data);
			return response.data;
		} catch (error) {
			console.log(error);
			throw new Error("Error while fetching data");
		}
	});

	const handleCheckboxChange = async (id, status) => {
		// Handle checkbox change logic
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
				<AvatarComponent size={80} />

				<div className="task-container">
					<InputBox handleSubmit={handleSubmit} handleTaskTitleChange={handleTaskTitleChange} taskTitle={taskTitle} />
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
										<TaskList
											data={data}
											setData={setData}
											handleCheckboxChange={handleCheckboxChange}
											handleDelete={handleDelete}
											activeMenuId={activeMenuId}
											handleDropdownVisibleChange={handleDropdownVisibleChange}
										/>
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