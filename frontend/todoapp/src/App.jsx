import { useState, useEffect } from 'react'
import { Avatar } from 'antd';
import { Card, Input, Button } from 'antd';
import { Checkbox, Dropdown, Popover, Spin, message } from 'antd';
import { DragOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { ReactSortable } from "react-sortablejs";
import { useQuery } from 'react-query';
import axios from 'axios';
import './App.css'

const convertTimezone = (dateString, toTimezone) => {
	const date = new Date(dateString);
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone: toTimezone,
	};
	const localTimeString = date.toLocaleString('en-US', options);
	return localTimeString;
};

function App() {
	const [messageApi, contextHolder] = message.useMessage();
	const [taskTitle, setTaskTitle] = useState("");
	const [data, setData] = useState([]);

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
			const response = await axios.post("http://localhost:3000/api/createTask", {
				title: taskTitle
			});
			if (response.status !== 200) {
				console.log("Error while adding task");
			}
			console.log("RESPONSE: ", response.data)
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
			const response = await axios.delete(`http://localhost:3000/api/delTask/${id}`);
			if (response.status !== 200) {
				console.log("Error while deleting task");
			}
			console.log("RESPONSE: ", response.data)
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
			const response = await axios.get("http://localhost:3000/api/getTasks");
			if (response.status !== 200) {
				console.log("Error while fetching data");
			}
			console.log("RESPONSE: ", response.data)
			// setData(response.data);
			// setData([
			// 	{"_id": "647e62a08b927351cdd3ff22", "text": "Task 1"},
			// 	{"_id": "2", "text": "Task 2"},
			// 	{"_id": "3", "text": "Task 3"},
			// ]);
			setData(response.data);
			return response.data;
		} catch (error) {
			console.log(error);
			throw new Error("Error while fetching data");
		}
	});

	const [activeMenuId, setActiveMenuId] = useState(null);

	const handleCheckboxChange = async (id, status) => {
		// Handle checkbox change logic
		console.log("Checkbox Change: ", id);
		// if status == checked then set unchecked else set active

		if (status === "checked") {
			await axios.patch(`http://localhost:3000/api/uncheckTask/${id}`).then((response) => {
				if (response.status !== 200) {
					console.log("Error while updating task");
					messageApi.error("Error while updating task");
				}
				console.log("RESPONSE: ", response.data)
				setData(data.map((item) => {
					if (item._id === id) {
						item.status = "active";
					}
					return item;
				}));
			}).catch((error) => {
				console.log(error);
				throw new Error("Error while updating task");
			});
		} else {
			await axios.patch(`http://localhost:3000/api/checkTask/${id}`).then((response) => {
				if (response.status !== 200) {
					console.log("Error while updating task");
					messageApi.error("Error while updating task");
				}
				console.log("RESPONSE: ", response.data)
				setData(data.map((item) => {
					if (item._id === id) {
						item.status = "checked";
						item.checkedAt = response.data.checkedAt;
					}
					return item;
				}));
			}).catch((error) => {
				console.log(error);
				throw new Error("Error while updating task");
			});
		}

	};

	const handleDropdownVisibleChange = (visible, menuId) => {
		if (!visible) {
			setActiveMenuId(null);
		} else {
			setActiveMenuId(menuId);
		}
	};

	const content = (creationTime, completedTime) => (
		<div>
			<p style={{ fontSize: '16px', marginBottom: '8px' }}>
				<span style={{ fontWeight: 'bold' }}>Created at:</span>{' '}
				{convertTimezone(creationTime, 'Asia/karachi')}
			</p>
			<p style={{ fontSize: '16px' }}>
				<span style={{ fontWeight: 'bold' }}>Completed at:</span>{' '}
				{convertTimezone(completedTime, 'Asia/karachi')}
			</p>
		</div>

	);

	return (
		<div className="app-bg" style={{ "--img": "url('https://images.unsplash.com/photo-1610907083431-d36d8947c8e2')" }}>
			{contextHolder}
			<div style={{ width: '400px', height: '600px' }}>
				<Avatar style={{ border: '2px solid #cccccc', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.5)', marginBottom: '40px' }} size={80} icon={<img src="https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY=" />} />

				<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
					<div
						style={{
							background: 'rgba(255, 255, 255, 0.4)',
							backdropFilter: 'blur(10px)',
							border: 'none',
							boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
							padding: '10px',
							display: 'flex',
							alignItems: 'center',
							borderRadius: '5px',
							gap: '10px',
						}}
					>
						<Input
							value={taskTitle}
							onChange={handleTaskTitleChange}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleSubmit();
								}
							}}
							style={{
								background: 'rgba(255, 255, 255, 0.5)',
								border: 'none',
								boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
							}}
							placeholder="Enter Task"
						/>
						<Button onClick={handleSubmit} style={{
							background: 'rgba(0, 123, 255, 0.7)',
							border: 'none',
							boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
						}} type="primary">Add</Button>
					</div>

					{
						isLoading ? (
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
								<Spin />
							</div>
						) : (
							isError ? (
								<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
									<p>No Tasks Found</p>
								</div>
							) : (
								isSuccess && (
									<div style={{ padding: '5px', paddingTop: '5px', borderRadius: "5px", overflowY: 'scroll', maxHeight: "400px" }}>
										{console.log("DATA: ", data)}
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
												<Popover content={content(item.createdAt, item.checkedAt)} placement='left'>
													<Dropdown
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
														<div key={item._id} style={{
															background: 'rgba(255, 255, 255, 0.4)',
															backdropFilter: 'blur(10px)',
															border: 'none',
															boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
															padding: '10px',
															display: 'flex',
															alignItems: 'center',
															borderRadius: '5px',
															gap: '10px',
															marginBottom: '10px',
														}}>
															<div
																style={{
																	display: 'flex',
																	alignItems: 'center',
																	justifyContent: 'space-between',
																	paddingLeft: '4px',
																	paddingRight: '4px',
																	width: '100%',
																}}
															>
																<div style={{ display: 'flex', alignItems: 'center' }}>
																	<Checkbox
																		checked={item.status == 'checked'}
																		className='checkBox'
																		style={{ marginRight: '10px' }}
																		onChange={() => handleCheckboxChange(item._id, item.status)}
																	/>
																	<span style={{ fontWeight: "500", color: "#1A120B", textAlign: "left" }}>{item.title}</span>
																</div>
																<div style={{ cursor: 'grab', display: 'flex', alignItems: 'center' }}>
																	<svg height="18" width="18" viewBox="0 0 24 24"><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z" fill="currentColor"></path></svg>
																</div>
															</div>
														</div>
													</Dropdown>
												</Popover>
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