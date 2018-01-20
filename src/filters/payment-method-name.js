const paymentMethodName = {}

function convertPaymentMethodName (number) {
	let name = ''
	switch (number) {
	case 1:
		name = 'Daily'
		break
	case 7:
		name = 'Weekly'
		break
	case 15:
		name = 'Biweekly'
		break
	case 30:
		name = 'Monthly'
		break
	default:
		name = 'Monthly'
		break
	}
	return `${name}`
}

paymentMethodName.install = function (Vue) {
	Vue.filter('payment-method-name', (val) => {
		return convertPaymentMethodName(val)
	})
}

export default paymentMethodName
