import paymentControlService from './payment-control'

const paymentEmployeesService = {}

paymentEmployeesService.GetListPaymentEmployeesByPaymentsId = function (id) {
	return paymentControlService.get(`/paymentEmployees/GetListPaymentEmployeesByPaymentsId/${id}`)
		.then(res => res.data)
		.catch(err => console.error(err))
}

paymentEmployeesService.GetListEmployeesWithPaymentEmployeesByPaymentsId = function (id) {
	return paymentControlService.get(`/paymentEmployees/GetListEmployeesWithPaymentEmployeesByPaymentsId/${id}`)
		.then(res => res.data)
		.catch(err => console.error(err))
}

paymentEmployeesService.InsertPaymentEmployees = function (id, data) {
	return paymentControlService.post('/paymentEmployees/InsertPaymentEmployees', { id, data })
		.then(res => res.data)
		.catch(err => console.error(err))
}

export default paymentEmployeesService
