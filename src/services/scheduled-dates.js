import paymentControlService from './payment-control'

const scheduledDatesService = {}

scheduledDatesService.GetListScheduledDatesByBusinessBy = function (id) {
	return paymentControlService.get(`/scheduledDates/GetListScheduledDatesByBusinessBy/${id}`)
		.then(res => res.data)
		.catch(err => console.error(err))
}

scheduledDatesService.InsertScheduledDates = function (id, dates) {
	return paymentControlService.post('/scheduledDates/InsertScheduledDates', { id, dates })
		.then(res => res.data)
		.catch(err => console.error(err))
}

export default scheduledDatesService
