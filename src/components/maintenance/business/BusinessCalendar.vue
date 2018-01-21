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
				.column
					div(data-provide="calendar")
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
				disabled: false
			}
		},
		created () {
			const id = this.$route.params.id
			businessService.GetBusinessById(id)
				.then(res => {
					this.company = res
					this.title = `Calendar of ${this.company.bus_fullname}`
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
			}
		}
	}
</script>
