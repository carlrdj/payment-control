const millisecondsToFormattedDate = {}

function convertMillisecondsToFormattedDate (milliseconds) {
	let date = new Date(milliseconds)
	let months = [{index: 0, name: 'January'}, {index: 1, name: 'February'}, {index: 2, name: 'March'}, {index: 3, name: 'April'}, {index: 4, name: 'May'}, {index: 5, name: 'June'}, {index: 6, name: 'July'}, {index: 7, name: 'August'}, {index: 8, name: 'September'}, {index: 9, name: 'October'}, {index: 10, name: 'November'}, {index: 11, name: 'December'}]
	return `${date.getDate()} ${months[date.getMonth()]['name']} ${date.getFullYear()}`
}

millisecondsToFormattedDate.install = function (Vue) {
	Vue.filter('milliseconds-to-formatted-date', (val) => {
		if (val === '') {
			return ''
		}
		return convertMillisecondsToFormattedDate(val)
	})
}

export default millisecondsToFormattedDate
