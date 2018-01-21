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
			.columns.is-multiline
				.column(v-for="day in days")
					p {{day.day}}
					
			form(@submit.prevent="showModalConfirmSaveCalendar")
				.columns.is-multiline
					.column.is-half
						.field
							label.label Date
								span.tag.is-warning.is-pulled-right Required !
							.control
								input.input(type="date", placeholder="Date", required, :disabled="disabled")

					.column.is-12
						.field.is-grouped.is-grouped-centered
							.control
								button.button.is-medium.is-link(type="submit", :disabled="disabled", v-bind:class="{'is-loading': disabled}") SAVE
</template>

<script>
	import businessService from '@/services/business'
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
				days: []
			}
		},
		created () {
			const id = this.$route.params.id
			businessService.GetBusinessById(id)
				.then(res => {
					this.company = res
					this.title = `Calendar of ${this.company.bus_fullname}`
				})
			this.getDaysInMonth(0, 2018)
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
			getDaysInMonth (month, year) {
				let date = new Date(year, month, 1)
				let startComplete = true
				let day = ''
				while (date.getMonth() === month) {
					day = new Date(date)
					if (startComplete) {
						this.startCompleteDays(day)
						startComplete = false
					}
					this.days.push({date: day, day: day.getDay()})
					date.setDate(date.getDate() + 1)
				}
				this.endCompleteDays(day)
			},
			startCompleteDays (day) {
				for (var i = 0; i < day.getDay(); i++) {
					this.days.push({date: '', day: ''})
				}
			},
			endCompleteDays (day) {
				for (var i = day.getDay(); i < 7; i++) {
					this.days.push({date: '', day: ''})
				}
			}
		}
	}
</script>
