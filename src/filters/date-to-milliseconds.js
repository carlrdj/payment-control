const dateToMilliseconds = {}

function convertDateToMilliseconds (date) {
	let milliseconds = new Date(date).getTime()
	return `${milliseconds}`
}

dateToMilliseconds.install = function (Vue) {
	Vue.filter('date-to-milliseconds', (val) => {
		return convertDateToMilliseconds(val)
	})
}

export default dateToMilliseconds
