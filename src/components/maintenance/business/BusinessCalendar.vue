<template lang="pug">
	.container
		.columns
			.column.is-four-fifths
				h1.title {{ title }}
			.column.has-text-right
				router-link.button.is-rounded.is-danger(to="/maintenance/business")
					span.icon
						i.fa.fa-angle-left(aria-hidden='true')
					span Back
		.box
			.columns
				.column.is-multiline
					form(@submit.prevent="generateDaySelection(company.bus_payment_method)")
						.columns
							.column.is-6
								.field
									label.label Start date
										span.tag.is-warning.is-pulled-right Required !
									.control
										input.input(type="date", placeholder="Start date", v-model="startDate", required, :disabled="disabled", :min="startDate")
							.column
								.field.is-grouped.is-grouped-centered
									.control
										button.button.is-medium.is-link(type="submit", :disabled="disabled", v-bind:class="{'is-loading': disabled}") GENERATE
										a.button.is-medium.is-danger(v-on:click="resetDaySelection") RESET
					hr
					.column-12
						.field.is-grouped.is-grouped-centered
							.control
								a.button.is-medium.is-link(:disabled="disabled", v-bind:class="{'is-loading': disabled}", v-on:click="showModalConfirmSaveScheduledDates") SAVE

		.columns.is-mobile
			.column.has-text-centered
				.button.is-white(@click="lastYear")
					i.fa.fa-angle-left.fa-3x(aria-hidden="true")
			.column.has-text-centered
				h1.title {{ year }}
			.column.has-text-centered
				.button.is-white(@click="nextYear")
					i.fa.fa-angle-right.fa-3x(aria-hidden="true")

		.columns.is-multiline
			.column.is-4(v-for="mon in months")
				.calendar
					.calendar-nav 
						.has-text-centered {{ mon.name }}
					.calendar-container
						.calendar-header
							.calendar-date(v-for="weeDay in weekDays") {{ weeDay }}
						.calendar-body
							.calendar-date(
							v-for="monDay in monthDays[mon.index]", 
							v-bind:class="{'is-disabled': monDay.disabled}")
								button.date-item(v-bind:class="{'is-active': selectedDay(monDay.id)}", v-on:click="selectDay(monDay.id)") {{ monDay.day }}

		p-c-modal-confirm(
		v-on:modal-confirm-insert-scheduled-dates="insertScheduledDates"
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
			const id = this.$route.params.id
			businessService.GetBusinessById(id)
				.then(res => {
					this.company = res
					this.title = `Calendar of ${this.company.bus_fullname}`
				})
			this.getMonthDays()
			scheduledDatesService.GetListScheduledDatesByBusinessBy(id)
				.then(res => {
					this.scheduledDates = res
					for (var i = 0; i < this.scheduledDates.length; i++) {
						let date = new Date(this.scheduledDates[i]['sch_dat_date'] + ' 00:00:00 GMT-0500')
						this.selectedDays.push(date.getTime())
					}
				})
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
			showModalConfirmSaveCalendar () {
				console.log('Calendar')
			},
			lastYear () {
				let yearCurrent = (new Date()).getFullYear()
				if (yearCurrent >= this.year--)	{
					this.year = yearCurrent
				}
			},
			nextYear () {
				this.year++
			},
			getMonthDays () {
				for (var i = 0; i < this.months.length; i++) {
					let date = new Date(this.year, i, 1)
					let startComplete = true
					let day = ''
					let beforeDays = []
					let days = []
					let afterDays = []
					while (date.getMonth() === i) {
						day = new Date(date)
						if (startComplete) {
							beforeDays = this.startCompleteDays(day.getDay())
							startComplete = false
						}
						days.push({id: day.getTime(), day: day.getDate(), disabled: false})
						date.setDate(date.getDate() + 1)
					}
					afterDays = this.endCompleteDays(day.getDay())
					this.monthDays.push(beforeDays.concat(days).concat(afterDays))
				}
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
				for (var i = day; i < 7; i++) {
					afterDays.push({day: '', disabled: true})
				}
				return afterDays
			},
			selectDay (id) {
				if (this.selectedDays.indexOf(id) === -1) {
					this.selectedDays.push(id)
				} else {
					this.selectedDays.splice(this.selectedDays.indexOf(id), 1)
				}
			},
			selectedDay (day) {
				if (this.selectedDays.indexOf(day) !== -1) {
					return true
				}
				return false
			},
			generateDaySelection (paymentMethod) {
				let selectDate = new Date(this.startDate + ' 00:00:00 GMT-0500')
				for (var i = 0; i < this.months.length; i++) {
					let date = new Date(this.year, i, 1)
					let count = 0
					while (date.getMonth() === i) {
						count++
						let day = new Date(date)
						if (parseInt(paymentMethod) === 7 && day.getDay() === selectDate.getDay() && day >= selectDate) {
							this.selectedDays.push(day.getTime())
						}
						date.setDate(date.getDate() + 1)
					}
					let midMonth = Math.floor(count / 2)
					if (parseInt(paymentMethod) === 15) {
						if (new Date(this.year, i, midMonth) >= selectDate) {
							this.selectedDays.push((new Date(this.year, i, midMonth)).getTime())
						}
						this.selectedDays.push((new Date(this.year, i, count)).getTime())
					}
					if (parseInt(paymentMethod) === 30) {
						this.selectedDays.push((new Date(this.year, i, count)).getTime())
					}
				}
			},
			resetDaySelection () {
				this.selectedDays = []
			},
			showModalConfirmSaveScheduledDates () {
				this.modalConfirm.title = 'Save calendar'
				this.modalConfirm.id = this.company.bus_id
				this.modalConfirm.body = `Do you want to save calendar?`
				this.modalConfirm.eventListener = 'modal-confirm-insert-scheduled-dates'
				this.$bus.$emit('set-modal-confirm', this.modalConfirm)
			},
			insertScheduledDates (id) {
				this.disabled = true
				scheduledDatesService.InsertScheduledDates(id, this.selectedDays)
					.then(res => {
						this.notification = res
						this.$bus.$emit('set-notification', this.notification)
						this.disabled = false
					})
			}
		},
		watch: {
			year () {
				this.monthDays = []
				this.getMonthDays()
			}
		}
	}
</script>
