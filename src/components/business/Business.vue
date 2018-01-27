<template lang="pug">
	.container.main-container
		.row.bg-white.rounded.box-shadow.mb-3.pt-2.pb-2
			.col-8
				h2 {{ title }}

		.row
			.col-12.col-sm-6.col-md-4.col-lg-4.pl-4.pr-4.pb-3(v-for="bus in business")
				.row.card.bg-white.rounded.box-shadow
					.card-header.d-flex.justify-content-between.align-items-center(v-bind:class="{'bg-danger | text-white': vereifyLimitDate(nextPayments[bus.bus_id])}")
						h6 {{ bus.bus_fullname }}
						span.badge.badge-dark.pl-2.pr-2 {{ parseInt(bus.bus_payment_method) | payment-method-name }}
					.card-body
						.col-12.d-flex.justify-content-between.align-items-center
							span.font-weight-bold Last record:
							span {{ lastPayments[bus.bus_id] | milliseconds-to-formatted-date }}
						.col-12.d-flex.justify-content-between.align-items-center
							span.font-weight-bold Scheduled:
							span {{ nextPayments[bus.bus_id] | milliseconds-to-formatted-date }}
						hr
						.col-12.d-flex.justify-content-between.align-items-center
							.btn.btn-outline-primary(v-on:click="goToPayments(bus.bus_id)")
								i.fa.fa-calendar.mr-2
								| Scheduled

							.btn.btn-outline-primary(v-on:click="goToRecord(bus.bus_id)")
								i.fa.fa-list.mr-2
								| Record


		p-c-loader(v-show="isLoading")

</template>

<script>
	import businessService from '@/services/business'
	import paymentsService from '@/services/payments'
	import PCLoader from '@/components/shared/Loader.vue'
	export default {
		components: {
			PCLoader
		},
		data ()	{
			return {
				title: 'Business',
				business: [],
				bus_ids: [],
				modalConfirm: {},
				notification: {},
				lastPayments: [],
				nextPayments: [],
				isLoading: true
			}
		},
		created () {
			const self = this
			self.getLastPayments()
		},
		computed: {
			resultMessage () {
				const self = this
				if (self.business.length === 0) {
					return `No se encontraron resultados`
				} else {
					return `Encontrados: ${self.business.length}`
				}
			}
		},
		methods: {
			getListBusiness () {
				const self = this
				businessService.GetListBusiness(self.searchQuery)
					.then(res => {
						self.business = res
						self.isLoading = false
					})
			},
			goToPayments (id) {
				const self = this
				self.$router.push({ name: 'scheduled-payments', params: { id } })
			},
			goToRecord (id) {
				const self = this
				self.$router.push({ name: 'business-payment-history', params: { id } })
			},
			getLastPayments () {
				const self = this
				paymentsService.GetLastPayments()
					.then(res => {
						for (var i = 0; i < res.length; i++) {
							self.lastPayments[res[i]['bus_id']] = res[i]['pay_date']
						}
						self.getNextPayments()
					})
			},
			getNextPayments () {
				const self = this
				paymentsService.GetNextPayments()
					.then(res => {
						for (var i = 0; i < res.length; i++) {
							self.nextPayments[res[i]['bus_id']] = res[i]['sch_dat_date']
						}
						self.getListBusiness()
					})
			},
			vereifyLimitDate (date) {
				let dateCurrent = new Date().toISOString().slice(0, 10)
				if (date) {
					if (date < dateCurrent) {
						return true
					}
				} else {
					return false
				}
			}
		}
	}
</script>