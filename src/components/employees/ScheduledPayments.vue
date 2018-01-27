<template lang="pug">
	.container.main-container
		.row.bg-white.rounded.box-shadow.mb-3.pt-2.pb-2
			.col-8
				h2 {{ title }}
			.col-4.d-flex.align-items-center.flex-row-reverse
				router-link.btn.btn-link(to="/")
					span.icon
						i.fa.fa-chevron-left(aria-hidden='true')
					span Back

		.row.bg-primary.text-white.rounded.box-shadow.mb-3.pt-2.pb-2
			.col-8
				h2 {{ company.bus_fullname }}

		.row.bg-white.rounded.box-shadow.pt-4.pb-4
			.col-12.col-md-6
				.row

					p-c-calendar(
					v-bind:scheduledDates="scheduledDates", 
					v-bind:registeredDates="registeredDates", 
					v-bind:bus_id="company.bus_id",
					v-on:refreshGetListPaymentsByBusinessId="getListPaymentsByBusinessId")

					p-c-payment-history(v-bind:payments="payments", v-bind:lastRecordedDatePayId="lastRecordedDatePayId", v-on:refreshGetListPaymentsEmployeesEdit="getListPaymentsEmployeesEdit", v-on:refreshGetListPaymentsEmployeesView="getListPaymentsEmployeesView")

			.col-12.col-md-6
				p-c-payment-employees(
				v-bind:payment="payment",
				v-bind:paymentEnable="paymentEnable",
				v-bind:paymentEmployees="paymentEmployees",
				v-bind:employeesPaymentEmployees="employeesPaymentEmployees"				
				)

		p-c-modal-confirm(
		v-on:modal-confirm-insert-payments="insertPayments",
		v-on:modal-confirm-save-payment-employees="savePaymentEmployees")

		p-c-loader(v-show="isLoading")
</template>

<script>
	import paymentEmployees from '@/services/payment-employees'
	import businessService from '@/services/business'
	import paymentsService from '@/services/payments'
	import scheduledDatesService from '@/services/scheduled-dates'
	import PCLoader from '@/components/shared/Loader.vue'
	import PCModalConfirm from '@/components/shared/ModalConfirm.vue'
	import PCCalendar from '@/components/employees/Calendar.vue'
	import PCPaymentHistory from '@/components/employees/PaymentHistory.vue'
	import PCPaymentEmployees from '@/components/employees/PaymentEmployees.vue'
	export default {
		components: {
			PCPaymentEmployees, PCPaymentHistory, PCCalendar, PCModalConfirm, PCLoader
		},
		data ()	{
			return {
				title: 'Scheduled payments',
				isLoading: true,
				disabled: true,
				company: {},
				modalConfirm: {},
				notification: {},
				payment: {},
				paymentEnable: false,
				payments: [],
				paymentEmployees: [],
				employeesPaymentEmployees: [],
				scheduledDates: [],
				registeredDates: [],
				lastRecordedDatePayId: 0
			}
		},
		created () {
			const id = this.$route.params.id
			this.getBusinessById(id)
			this.getListScheduledDatesByBusinessBy(id)
			this.getListPaymentsByBusinessId(id)
		},
		methods: {
			getBusinessById (id) {
				const self = this
				businessService.GetBusinessById(id)
					.then(res => {
						self.company = res
					})
			},
			getListScheduledDatesByBusinessBy (id) {
				const self = this
				scheduledDatesService.GetListScheduledDatesByBusinessBy(id)
					.then(res => {
						for (var i = 0; i < res.length; i++) {
							let date = new Date(res[i]['sch_dat_date'] + ' 00:00:00 GMT-0500')
							self.scheduledDates.push(date.getTime())
						}
					})
			},
			getListPaymentsByBusinessId (id) {
				const self = this
				self.registeredDates = []
				paymentsService.GetListPaymentsByBusinessId(id)
					.then(res => {
						self.payments = res
						for (var i = 0; i < res.length; i++) {
							let date = new Date(res[i]['pay_date'] + ' 00:00:00 GMT-0500')
							self.registeredDates.push(date.getTime())
							self.lastRecordedDatePayId = parseInt(res[0]['pay_id'])
						}
						self.isLoading = false
					})
			},
			getListPaymentsEmployeesEdit (payment, enable) {
				const self = this
				self.payment = payment
				self.paymentEnable = enable
				this.getListPaymentEmployeesByPaymentsId(payment.pay_id)
			},
			getListPaymentsEmployeesView (payment, enable) {
				const self = this
				self.payment = payment
				self.paymentEnable = enable
				this.getListEmployeesWithPaymentEmployeesByPaymentsId(payment.pay_id)
			},
			getListPaymentEmployeesByPaymentsId (id) {
				const self = this
				paymentEmployees.GetListPaymentEmployeesByPaymentsId(id)
					.then(res => {
						self.paymentEmployees = res
						self.isLoading = false
					})
			},
			getListEmployeesWithPaymentEmployeesByPaymentsId (id) {
				const self = this
				paymentEmployees.GetListEmployeesWithPaymentEmployeesByPaymentsId(id)
					.then(res => {
						self.employeesPaymentEmployees = res
						self.isLoading = false
					})
			},
			getNewPaymentsByBusinessId () {
				const self = this
				paymentsService.GetNewPaymentsByBusinessId(self.company.bus_id)
					.then(res => {
						self.payment = res
						self.paymentEnable = true
						self.getListPaymentEmployeesByPaymentsId(self.payment.pay_id)
					})
			},
			insertPayments (data) {
				const self = this
				self.isLoading = data.isLoading
				self.disabled = data.disabled
				let payment = {'bus_id': data.bus_id, 'pay_date': data.milliseconds}
				paymentsService.InsertPayments(payment)
					.then(res => {
						self.notification = res
						self.$bus.$emit('set-notification', self.notification)
						self.disabled = false
						self.isLoading = false
						self.getListPaymentsByBusinessId(data.bus_id)
						self.getNewPaymentsByBusinessId()
					})
			},
			savePaymentEmployees (data) {
				const self = this
				self.isLoading = data.isLoading
				self.disabled = data.disabled
				paymentEmployees.InsertPaymentEmployees(data.id, data.data)
					.then(res => {
						self.notification = res
						self.$bus.$emit('set-notification', self.notification)
						self.disabled = false
						self.isLoading = false
					})
			}
		}
	}
</script>