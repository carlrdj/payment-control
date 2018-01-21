import paymentControlService from './payment-control'

const businessService = {}

businessService.GetListBusiness = function () {
	return paymentControlService.get('/business/GetListBusiness')
		.then(res => res.data)
}

businessService.InsertBusiness = function (company) {
	return paymentControlService.post('/business/InsertBusiness', { company })
		.then(res => res.data)
		.catch(err => console.error(err))
}

businessService.GetBusinessById = function (id) {
	return paymentControlService.get(`/business/GetBusinessById/${id}`)
		.then(res => res.data)
}

businessService.UpdateBusiness = function (company) {
	return paymentControlService.patch('/business/UpdateBusiness', { company })
		.then(res => res.data)
		.catch(err => console.error(err))
}

businessService.DeleteBusiness = function (ids) {
	return paymentControlService.patch('/business/DeleteBusiness', { ids })
		.then(res => res.data)
		.catch(err => console.error(err))
}

businessService.ResetPasswordBusiness = function (ids) {
	return paymentControlService.patch('/business/ResetPasswordBusiness', { ids })
		.then(res => res.data)
		.catch(err => console.error(err))
}

export default businessService
