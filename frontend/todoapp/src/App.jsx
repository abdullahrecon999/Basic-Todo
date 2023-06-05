import { useState } from 'react'
import { Avatar } from 'antd';
import { Card, Input, Button } from 'antd';
import { Checkbox, Dropdown, Popover } from 'antd';
import { DragOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { ReactSortable } from "react-sortablejs";

import './App.css'

function App() {
	const [data, setData] = useState([
		{ id: '1', text: 'Task 1 this is the task i entered, it must properly handle long input texts' },
		{ id: '2', text: 'Task 2' },
		{ id: '3', text: 'Task 3' },
		{ id: '3', text: 'Task 3' },
		{ id: '3', text: 'Task 3' },
		{ id: '3', text: 'Task 3' },
		{ id: '3', text: 'Task 3' },
		{ id: '3', text: 'Task 3' },
		{ id: '3', text: 'Task 3' },
		{ id: '3', text: 'Task 3' },
		{ id: '3', text: 'Task 3' },
		// Add more tasks as needed
	]);

	const [activeMenuId, setActiveMenuId] = useState(null);

	const handleCheckboxChange = (id) => {
		// Handle checkbox change logic
	};

	const handleDropdownVisibleChange = (visible, menuId) => {
		if (!visible) {
			setActiveMenuId(null);
		} else {
			setActiveMenuId(menuId);
		}
	};

	return (
		<div className="app-bg" style={{ "--img": "url('https://images.unsplash.com/photo-1610907083431-d36d8947c8e2')" }}>
			<div style={{ width: '400px', height: '600px' }}>
				<Avatar style={{ border: '2px solid #cccccc', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.5)', marginBottom: '40px' }} size={80} icon={<img src="https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY=" />} />

				<div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
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
							style={{
								background: 'rgba(255, 255, 255, 0.5)',
								border: 'none',
								boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
							}}
							placeholder="Enter Task"
						/>
						<Button style={{
							background: 'rgba(0, 123, 255, 0.7)',
							border: 'none',
							boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
						}} type="primary">Add</Button>
					</div>

					<div style={{ padding: '5px', paddingTop:'5px', borderRadius: "5px", overflowY: 'scroll', maxHeight:"400px" }}>
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
								<Dropdown
									menu={{
										items: [
											{
												key: '1',
												label: 'Delete',
												icon: <DeleteOutlined />,
												danger: true,
												onClick: () => {
													// Handle delete logic
												}
											},
										]
									}}
									trigger={['contextMenu']}
									visible={activeMenuId === item.id}
									onVisibleChange={(visible) => handleDropdownVisibleChange(visible, item.id)}
								>
									<div key={item.id} style={{
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
													className='checkBox'
													style={{ marginRight: '10px' }}
													onChange={() => handleCheckboxChange(item.id)}
												/>
												<span style={{ fontWeight: "500", color: "#1A120B", textAlign:"left" }}>{item.text}</span>
											</div>
											<div style={{ cursor: 'grab', display: 'flex', alignItems: 'center' }}>
												<svg height="18" width="18" viewBox="0 0 24 24"><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z" fill="currentColor"></path></svg>
											</div>
										</div>
									</div>
								</Dropdown>
							))}
						</ReactSortable>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App