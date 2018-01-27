<template lang="pug">

	.div.w-100
		.col-12.d-flex.justify-content-between
			.button.cursor-pointer(@click="lastMonth")
				i.fa.fa-angle-left.fa-3x(aria-hidden="true")
			h1.title {{ year }}
			.button.cursor-pointer(@click="nextMonth")
				i.fa.fa-angle-right.fa-3x(aria-hidden="true")


		.col-12
			.calendar
				.calendar-nav.bg-dark.text-white
					.has-text-centered {{ months[month].name }}
				.calendar-container
					.calendar-header
						.calendar-date(v-for="weeDay in weekDays") {{ weeDay }}
					.calendar-body
						.calendar-date(v-for="monDay in monthDays[0]", v-bind:class="{'is-disabled': !markScheduledDates(monDay.id)}")
							button.date-item(v-bind:class="{'is-mark': markScheduledDates(monDay.id), 'is-registered': markRegisteredDates(monDay.id)}", v-on:click="showModalConfirmInsertPayments(monDay.id)") {{ monDay.day }}

</template>

<script>
	export default {
		components: {
		},
		props: {
			scheduledDates: {type: Array, required: true},
			registeredDates: {type: Array, required: true},
			bus_id: {required: true}
		},
		data ()	{
			return {
				modalConfirm: {},
				notification: {},
				year: new Date().getFullYear(),
				month: new Date().getMonth(),
				monthDays: [],
				months: [{index: 0, name: 'January'}, {index: 1, name: 'February'}, {index: 2, name: 'March'}, {index: 3, name: 'April'}, {index: 4, name: 'May'}, {index: 5, name: 'June'}, {index: 6, name: 'July'}, {index: 7, name: 'August'}, {index: 8, name: 'September'}, {index: 9, name: 'October'}, {index: 10, name: 'November'}, {index: 11, name: 'December'}],
				weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				payment: {}
			}
		},
		created () {
			const self = this
			self.getMonthDays()
		},
		computed: {
			resultMessage () {
				if (this.employees.length === 0) {
					return `No se encontraron resultados`
				} else {
					return `Encontrados: ${this.employees.length}`
				}
			}
		},
		methods: {
			getMonthDays () {
				const self = this
				self.monthDays = []
				let date = new Date(self.year, self.month, 1)
				let startComplete = true
				let day = ''
				let beforeDays = []
				let days = []
				let afterDays = []
				while (date.getMonth() === self.month) {
					day = new Date(date)
					if (startComplete) {
						beforeDays = self.startCompleteDays(day.getDay())
						startComplete = false
					}
					days.push({id: day.getTime(), day: day.getDate(), disabled: false})
					date.setDate(date.getDate() + 1)
				}
				afterDays = self.endCompleteDays(day.getDay())
				self.monthDays.push(beforeDays.concat(days).concat(afterDays))
			},
			startCompleteDays (day) {
				let beforeDays = []
				for (var i = 0; i < day; i++) {
					beforeDays.push({day: '', disabled: true})
				}
				return beforeDays
			},
			endCompleteDays (day) {
				let afterDays = []
				for (var i = day; i < 6; i++) {
					afterDays.push({day: '', disabled: true})
				}
				return afterDays
			},
			nextMonth () {
				const self = this
				self.month++
				if (self.month > 11) {
					self.month = 0
					self.year++
				}
				self.getMonthDays()
			},
			lastMonth () {
				const self = this
				self.month--
				if (self.month < 0) {
					self.month = 11
					self.year--
				}
				self.getMonthDays()
			},
			markScheduledDates (id) {
				const self = this
				if (self.scheduledDates.indexOf(id) !== -1) {
					return true
				}
				return false
			},
			markRegisteredDates (id) {
				const self = this
				if (self.registeredDates.indexOf(id) !== -1) {
					return true
				}
				return false
			},
			showModalConfirmInsertPayments (milliseconds) {
				const self = this
				let date = new Date(milliseconds)
				if (self.markScheduledDates(milliseconds) && !self.markRegisteredDates(milliseconds)) {
					if (new Date().getTime() >= milliseconds) {
						self.modalConfirm.action = 'primary'
						self.modalConfirm.title = 'Create payment form'
						self.modalConfirm.data = {'bus_id': self.bus_id, 'milliseconds': milliseconds, 'disabled': true, 'isLoading': true}
						self.modalConfirm.body = `You want to create payment form for the date: ${date.getDate()} ${self.months[date.getMonth()]['name']} ${date.getFullYear()}?`
						self.modalConfirm.eventListener = 'modal-confirm-insert-payments'
						self.$bus.$emit('set-modal-confirm', self.modalConfirm)
					} else {
						self.notification = {response: true, message: 'Can not be created yet', class: 'bg-danger'}
						self.$bus.$emit('set-notification', self.notification)
						self.notification = {}
					}
				}
			}
		}
	}
</script>