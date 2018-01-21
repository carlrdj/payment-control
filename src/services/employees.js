import paymentControlService from './payment-control'

const employeesService = {}

employeesService.GetListEmployeesByBusinessBy = function (id) {
	return paymentControlService.get(`/employees/GetListEmployeesByBusinessBy/${id}`)
		.then(res => res.data)
		.catch(err => console.error(err))
}

employeesService.InsertEmployees = function (employee) {
	return paymentControlService.post('/employees/InsertEmployees', { employee })
		.then(res => res.data)
		.catch(err => console.error(err))
}

employeesService.GetEmployeesById = function (id) {
	return paymentControlService.get(`/employees/GetEmployeesById/${id}`)
		.then(res => res.data)
		.catch(err => console.error(err))
}

employeesService.UpdateEmployees = function (employee) {
	return paymentControlService.patch('/employees/UpdateEmployees', { employee })
		.then(res => res.data)
		.catch(err => console.error(err))
}

employeesService.DeleteEmployees = function (ids) {
	return paymentControlService.patch('/employees/DeleteEmployees', { ids })
		.then(res => res.data)
		.catch(err => console.error(err))
}

export default employeesService
