import paymentControlService from './payment-control'

const usersService = {}

usersService.GetAuthentication = function (user) {
	return paymentControlService.post('/users/GetAuthentication', { user })
		.then(res => res.data)
		.catch(err => console.error(err))
}

usersService.GetCheckToken = function (token) {
	return paymentControlService.post(`/users/GetCheckToken`, { token })
		.then(res => res.data)
		.catch(err => console.error(err))
}

export default usersService
