<template lang="pug">
	.container.main-container
		.row.bg-white.rounded.box-shadow.mb-3.pt-2.pb-2
			.col-8
				h2 {{ title }}
			.col-4.d-flex.align-items-center.flex-row-reverse
				router-link.btn.btn-primary(to="/maintenance/business/form")
					span.icon
						i.fa.fa-plus(aria-hidden='true')
					span Add

		.row.bg-white.rounded.box-shadow.pt-4.pb-2
			.col-12
				table.table.table-striped.table-hover
					thead
						tr
							th Company name
							th EIC
							th Way to pay
							th Email
							th.th-button
					tbody
						tr(v-for="bus in business")
							td(data-label="Company name") {{ bus.bus_fullname }}
							td(data-label="EIC") {{ bus.bus_eic }}
							td(data-label="Way to pay") {{ parseInt(bus.bus_payment_method) | payment-method-name }}
							td(data-label="Email") {{ bus.bus_email }}
							td.td-button
								.dropdown.dropleft
									button#dropdownMenuButtonBusiness.btn.btn-link.dropdown-toggle.dropdown-toggle-split(data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
										i.fa.fa-ellipsis-v(aria-hidden="true")
									.dropdown-menu(aria-labelledby='dropdownMenuButtonBusiness')
										.btn.btn-block.text-left(v-on:click="goToMaintenanceBusinessEmployees(bus.bus_id)")
											span.icon
												i.fa.fa-user-plus(aria-hidden='true')
											span Employees

										.btn.btn-block.text-left(v-on:click="goToMaintenanceBusinessCalendarForm(bus.bus_id)")
											span.icon
												i.fa.fa-calendar(aria-hidden='true')
											span Calendar
								
										.btn.btn-block.text-left(v-on:click="showModalConfirmResetPasswordBusiness(bus.bus_id, bus.bus_fullname)")
											span.icon
												i.fa.fa-key(aria-hidden='true')
											span Reset

										.btn.btn-block.text-left(v-on:click="goToMaintenanceBusinessForm(bus.bus_id)")
											span.icon
												i.fa.fa-pencil(aria-hidden='true')
											span Edit

										.btn.btn-block.text-left(v-on:click="showModalConfirmDeleteBusiness(bus.bus_id, bus.bus_fullname)")
											span.icon
												i.fa.fa-trash(aria-hidden='true')
											span Remove


		p-c-loader(v-show="isLoading")
		
		p-c-modal-confirm(
		v-on:modal-confirm-delete-busines="deleteBusiness", v-on:modal-confirm-reset-password-busines="resetPasswordBusiness"
		)

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
				title: 'Business',
				business: [],
				bus_ids: [],
				modalConfirm: {},
				notification: {},
				isLoading: true
			}
		},
		created () {
			const self = this
			self.getListBusiness()
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
						self.isLoading = false
						self.business = res
					})
			},
			goToMaintenanceBusinessForm (id) {
				const self = this
				self.$router.push({ name: 'maintenance-business-form-id', params: { id } })
			},
			goToMaintenanceBusinessCalendarForm (id) {
				const self = this
				self.$router.push({ name: 'maintenance-business-calendar-id', params: { id } })
			},
			goToMaintenanceBusinessEmployees (id) {
				const self = this
				self.$router.push({ name: 'maintenance-business-employees-id', params: { id } })
			},
			showModalConfirmDeleteBusiness (id, fullname) {
				const self = this
				self.modalConfirm.action = 'danger'
				self.modalConfirm.title = 'Remove company'
				self.modalConfirm.data = {'id': id}
				self.modalConfirm.body = `Do you want to remove ${fullname}?`
				self.modalConfirm.eventListener = 'modal-confirm-delete-busines'
				self.$bus.$emit('set-modal-confirm', self.modalConfirm)
			},
			deleteBusiness (data) {
				const self = this
				let id = data.id
				self.bus_ids.push({id})
				self.isLoading = true
				businessService.DeleteBusiness(self.bus_ids)
					.then(res => {
						self.isLoading = false
						self.notification = res
						self.$bus.$emit('set-notification', self.notification)
						self.getListBusiness()
						self.notification = {}
					})
				self.bus_ids = []
			},
			showModalConfirmResetPasswordBusiness (id, fullname) {
				const self = this
				self.modalConfirm.action = 'dark'
				self.modalConfirm.title = 'Reset company password'
				self.modalConfirm.data = {'id': id}
				self.modalConfirm.body = `Do you want to reset password of ${fullname}?`
				self.modalConfirm.eventListener = 'modal-confirm-reset-password-busines'
				self.$bus.$emit('set-modal-confirm', self.modalConfirm)
			},
			resetPasswordBusiness (data) {
				const self = this
				let id = data.id
				self.bus_ids.push({ id })
				self.isLoading = true
				businessService.ResetPasswordBusiness(self.bus_ids)
					.then(res => {
						self.isLoading = false
						self.notification = res
						self.$bus.$emit('set-notification', self.notification)
						self.getListBusiness()
						self.notification = {}
					})
				self.bus_ids = []
			}
		}
	}
</script>