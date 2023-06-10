import { Avatar } from "antd";
import '../App.css';

export const AvatarComponent = ({ size }) => {
    return (
        <Avatar className="avatar" size={size} icon={<img src="https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY=" />} />
    );
};