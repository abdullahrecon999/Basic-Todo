import { Popover } from 'antd'
import { convertTimezone } from '../utils/convertTimeZone';
import '../App.css'

export const PopoverComponent = ({creationTime, completedTime, placement, children}) => {
    const content = () => (
		<div>
			<p>
				<span className="popover-bold">Created at:</span>{' '}
				{convertTimezone(creationTime, 'Asia/karachi')}
			</p>
			<p>
				<span className="popover-bold">Completed at:</span>{' '}
				{convertTimezone(completedTime, 'Asia/karachi')}
			</p>
		</div>
	);

    return (
        <Popover content={content} placement={placement} trigger="hover" overlayClassName="custom-popover">
            {children}
        </Popover>
    );
};