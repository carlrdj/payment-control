<template lang="pug">
	.col-12
		table.table.table-hover
			thead
				tr
					th Date
					th.th-button
			tbody
				tr(v-for="pay in paymentsShow")
					td {{ pay.pay_date | milliseconds-to-formatted-date }}
					td.td-button
						.btn.btn-primary(v-if="pay.pay_id == lastRecordedDatePayId", v-on:click="editPaymentEmployees(pay)")
							i.fa.fa-pencil(aria-hidden="true")
						.btn.btn-secondary(v-if="pay.pay_id != lastRecordedDatePayId", v-on:click="viewPaymentEmployees(pay)")
							i.fa.fa-eye(aria-hidden="true")

		nav(aria-label='Page navigation example', v-if="payments.length")
			ul.pagination.justify-content-center
				li.page-item(v-for="pag in pages", v-bind:class="{'disabled': page == pag}")
					.page-link(v-on:click="showPage(pag)") {{ pag }}

</template>

<script>
	import PCLoader from '@/components/shared/Loader.vue'
	import PCModalConfirm from '@/components/shared/ModalConfirm.vue'
	import PCCalendar from '@/components/employees/Calendar.vue'
	export default {
		components: {
			PCCalendar, PCModalConfirm, PCLoader
		},
		props: {
			payments: {type: Array, required: true},
			lastRecordedDatePayId: {type: Number, required: true}
		},
		data ()	{
			return {
				resultShow: 10,
				pages: [],
				page: 1,
				paymentsShow: []
			}
		},
		created () {
			const self = this
			self.showPage(this.page)
		},
		methods: {
			editPaymentEmployees (payment) {
				const self = this
				self.$emit('refreshGetListPaymentsEmployeesEdit', payment, true)
			},
			viewPaymentEmployees (payment) {
				const self = this
				self.$emit('refreshGetListPaymentsEmployeesView', payment, false)
			},
			generatePages () {
				const self = this
				let pages = Math.ceil(self.payments.length / self.resultShow)
				if (pages > 1) {
					for (var i = 1; i <= pages; i++) {
						self.pages.push(i)
					}
				}
			},
			showPage (page) {
				const self = this
				self.page = page
				self.paymentsShow = []
				let goPage = (page - 1) * self.resultShow
				let resultShow = 0
				if (goPage >= self.payments.length) {
					resultShow = self.payments.length - goPage
				} else {
					resultShow = page * self.resultShow
					if (self.payments.length < self.resultShow) {
						resultShow = self.payments.length
					}
				}
				for (var i = goPage; i < resultShow; i++) {
					self.paymentsShow.push(self.payments[i])
				}
			}
		},
		watch: {
			payments () {
				const self = this
				self.generatePages()
				self.showPage(self.page)
			}
		}
	}
</script>