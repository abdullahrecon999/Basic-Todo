export const convertTimezone = (dateString, toTimezone) => {
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