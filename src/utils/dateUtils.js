export function getDateMonthYear(rawDate) {
	const date = new Date(rawDate);

	return {
		date: date.getDate().toString().padStart(2, '0'),
		month: months[date.getMonth()],
		year: date.getFullYear(),
	};
}

export function formatExpiryDate(rawDate) {
	const { date, month, year } = getDateMonthYear(rawDate);

	return `${date} ${month} ${year}`;
}

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
