import paymentControlService from './payment-control'

const paymentsService = {}

paymentsService.GetListPaymentsByBusinessId = function (id) {
	return paymentControlService.get(`/payments/GetListPaymentsByBusinessId/${id}`)
		.then(res => res.data)
		.catch(err => console.error(err))
}

paymentsService.GetNewPaymentsByBusinessId = function (id) {
	return paymentControlService.get(`/payments/GetNewPaymentsByBusinessId/${id}`)
		.then(res => res.data)
		.catch(err => console.error(err))
}

paymentsService.GetLastPayments = function () {
	return paymentControlService.get(`/payments/GetLastPayments`)
		.then(res => res.data)
		.catch(err => console.error(err))
}

paymentsService.GetNextPayments = function () {
	return paymentControlService.get(`/payments/GetNextPayments`)
		.then(res => res.data)
		.catch(err => console.error(err))
}

paymentsService.GetPaymentsById = function (id) {
	return paymentControlService.get(`/payments/GetPaymentsById/${id}`)
		.then(res => res.data)
		.catch(err => console.error(err))
}

paymentsService.InsertPayments = function (payments) {
	return paymentControlService.post('/payments/InsertPayments', { payments })
		.then(res => res.data)
		.catch(err => console.error(err))
}

paymentsService.UpdatePayments = function (payments) {
	return paymentControlService.patch('/payments/UpdatePayments', { payments })
		.then(res => res.data)
		.catch(err => console.error(err))
}

export default paymentsService
