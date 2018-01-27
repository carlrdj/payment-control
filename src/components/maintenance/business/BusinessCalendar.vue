<template lang="pug">
	.container.main-container
		.row.bg-white.rounded.box-shadow.mb-3.pt-2.pb-2
			.col-8
				h2 {{ title }}
			.col-4.d-flex.align-items-center.flex-row-reverse
				router-link.btn.btn-link(to="/maintenance/business")
					span.icon
						i.fa.fa-chevron-left(aria-hidden='true')
					span Back

		.row.bg-white.rounded.box-shadow.mb-3.pt-4.pb-4
			.col-12
				form.row(@submit.prevent="generateDaySelection(company.bus_payment_method)")
					.col-12.col-sm-6
						.form-group
							label(for='startDate') Start date
								.badge.badge-primary {{ parseInt(company.bus_payment_method) | payment-method-name }}
							input#startDate.form-control(
								type='date',
								v-model="startDate",
								placeholder='Start date',
								v-bind:disabled="disabled", 
								:min="startDate"
								required)

					.col-12.col-sm-3.d-flex.align-items-center.justify-content-center
						button.btn.btn-dark.btn-lg.pl-3.pr-3(type="submit", :disabled="disabled") Generate
							i(v-bind:class="{'fa | fa-spinner | fa-pulse | fa-fw  | is-loading': disabled}")
						.btn.btn-danger.btn-lg.ml-2.pl-3.pr-3(:disabled="disabled", v-on:click="showModalConfirmResetCalendar") Reset
							i(v-bind:class="{'fa | fa-spinner | fa-pulse | fa-fw  | is-loading': disabled}")

					.col-12.col-sm-3.d-flex.align-items-center.justify-content-center
						.btn.btn-primary.btn-lg.pl-3.pr-3(:disabled="disabled", v-on:click="showModalConfirmSaveScheduledDates") Save
							i(v-bind:class="{'fa | fa-spinner | fa-pulse | fa-fw  | is-loading': disabled}")

		.row.bg-dark.text-white.rounded.box-shadow.mb-3.pt-2.pb-2
			.col-12.d-flex.justify-content-between
				.button.cursor-pointer(@click="lastYear")
					i.fa.fa-angle-left.fa-3x(aria-hidden="true")
				h1.title {{ year }}
				.button.cursor-pointer(@click="nextYear")
					i.fa.fa-angle-right.fa-3x(aria-hidden="true")

		.row.bg-white.rounded.box-shadow.pt-4.pb-2
			.col-12.col-md-6.col-lg-4(v-for="mon in months")
				.calendar
					.calendar-nav.bg-dark.text-white
						.has-text-centered {{ mon.name }}
					.calendar-container
						.calendar-header
							.calendar-date(v-for="weeDay in weekDays") {{ weeDay }}
						.calendar-body
							.calendar-date(
							v-for="monDay in monthDays[mon.index]", 
							v-bind:class="{'is-disabled': monDay.disabled}")
								button.date-item(v-bind:class="{'is-active': selectedDay(monDay.id)}", v-on:click="selectDay(monDay.id)") {{ monDay.day }}

		p-c-loader(v-show="isLoading")

		p-c-modal-confirm(
		v-on:modal-confirm-insert-scheduled-dates="insertScheduledDates",
		v-on:modal-confirm-reset-calendar="resetDaySelection"
		)
</template>

<script>
	import businessService from '@/services/business'
	import scheduledDatesService from '@/services/scheduled-dates'
	import PCModalConfirm from '@/components/shared/ModalConfirm.vue'
	import PCLoader from '@/components/shared/Loader.vue'
	export default {
		components: {
			PCModalConfirm, PCLoader
		},
		data ()	{
			return {
				title: '',
				company: {},
				modalConfirm: {},
				notification: {},
				isLoading: true,
				disabled: false,
				year: (new Date()).getFullYear(),
				months: [{index: 0, name: 'January'}, {index: 1, name: 'February'}, {index: 2, name: 'March'}, {index: 3, name: 'April'}, {index: 4, name: 'May'}, {index: 5, name: 'June'}, {index: 6, name: 'July'}, {index: 7, name: 'August'}, {index: 8, name: 'September'}, {index: 9, name: 'October'}, {index: 10, name: 'November'}, {index: 11, name: 'December'}],
				weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				monthDays: [],
				selectedDays: [],
				startDate: (new Date()).toISOString().slice(0, 10),
				scheduledDates: []
			}
		},
		created () {
			const self = this
			const id = self.$route.params.id
			businessService.GetBusinessById(id)
				.then(res => {
					self.company = res
					self.title = `Calendar of ${self.company.bus_fullname}`
				})
			self.getMonthDays()
			scheduledDatesService.GetListScheduledDatesByBusinessBy(id)
				.then(res => {
					self.scheduledDates = res
					for (var i = 0; i < self.scheduledDates.length; i++) {
						let date = new Date(self.scheduledDates[i]['sch_dat_date'] + ' 00:00:00 GMT-0500')
						self.selectedDays.push(date.getTime())
					}
				})
		},
		computed: {
			resultMessage () {
				const self = this
				if (self.employees.length === 0) {
					return `No se encontraron resultados`
				} else {
					return `Encontrados: ${self.employees.length}`
				}
			}
		},
		methods: {
			showModalConfirmSaveCalendar () {
				console.log('Calendar')
			},
			lastYear () {
				const self = this
				let yearCurrent = (new Date()).getFullYear()
				if (yearCurrent >= self.year--)	{
					self.year = yearCurrent
				}
			},
			nextYear () {
				const self = this
				self.year++
			},
			getMonthDays () {
				const self = this
				self.isLoading = true
				for (var i = 0; i < self.months.length; i++) {
					let date = new Date(self.year, i, 1)
					let startComplete = true
					let day = ''
					let beforeDays = []
					let days = []
					let afterDays = []
					while (date.getMonth() === i) {
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
				}
				self.isLoading = false
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
			selectDay (id) {
				const self = this
				if (id) {
					if (self.selectedDays.indexOf(id) === -1) {
						self.selectedDays.push(id)
					} else {
						self.selectedDays.splice(self.selectedDays.indexOf(id), 1)
					}
				}
			},
			selectDayAutomatic (id) {
				const self = this
				if (id) {
					if (self.selectedDays.indexOf(id) === -1) {
						self.selectedDays.push(id)
					}
				}
			},
			selectedDay (day) {
				const self = this
				if (self.selectedDays.indexOf(day) !== -1) {
					return true
				}
				return false
			},
			generateDaySelection (paymentMethod) {
				const self = this
				self.disabled = true
				let selectDate = new Date(self.startDate + ' 00:00:00 GMT-0500')
				for (var i = 0; i < self.months.length; i++) {
					let date = new Date(self.year, i, 1)
					let count = 0
					while (date.getMonth() === i) {
						count++
						let day = new Date(date)
						if (parseInt(paymentMethod) === 7 && day.getDay() === selectDate.getDay() && day >= selectDate) {
							self.selectDayAutomatic(day.getTime())
						}
						date.setDate(date.getDate() + 1)
					}
					let midMonth = Math.floor(count / 2)
					if (parseInt(paymentMethod) === 15) {
						if (new Date(self.year, i, midMonth) >= selectDate) {
							self.selectDayAutomatic((new Date(self.year, i, midMonth)).getTime())
						}
						self.selectDayAutomatic((new Date(self.year, i, count)).getTime())
					}
					if (parseInt(paymentMethod) === 30) {
						self.selectDayAutomatic((new Date(self.year, i, count)).getTime())
					}
				}
				self.disabled = false
			},
			showModalConfirmResetCalendar () {
				const self = this
				self.modalConfirm.action = 'danger'
				self.modalConfirm.title = 'Reset calendar'
				self.modalConfirm.data = {}
				self.modalConfirm.body = `Do you want to reset calendar?`
				self.modalConfirm.eventListener = 'modal-confirm-reset-calendar'
				self.$bus.$emit('set-modal-confirm', self.modalConfirm)
			},
			resetDaySelection () {
				const self = this
				self.selectedDays = []
			},
			showModalConfirmSaveScheduledDates () {
				const self = this
				self.modalConfirm.action = 'primary'
				self.modalConfirm.title = 'Save calendar'
				self.modalConfirm.data = {'bus_id': self.company.bus_id}
				self.modalConfirm.body = `Do you want to save calendar?`
				self.modalConfirm.eventListener = 'modal-confirm-insert-scheduled-dates'
				self.$bus.$emit('set-modal-confirm', self.modalConfirm)
			},
			insertScheduledDates (data) {
				const self = this
				self.disabled = true
				scheduledDatesService.InsertScheduledDates(data.bus_id, self.selectedDays)
					.then(res => {
						console.log(res)
						self.notification = res
						self.$bus.$emit('set-notification', self.notification)
						self.disabled = false
					})
			}
		},
		watch: {
			year () {
				const self = this
				self.monthDays = []
				self.getMonthDays()
			}
		}
	}
</script>
