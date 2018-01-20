<template lang="pug">
	.container
		.columns
			.column.is-four-fifths
				h1.title {{ title }}
			.column.has-text-right
				router-link.button.is-rounded.is-success(to="/maintenance/business/form")
					span.icon
						i.fa.fa-plus(aria-hidden='true')
					span Add
		.box
			.columns
				.column
					table.table.is-fullwidth.is-hoverable.is-striped
						thead
							tr
								th Company name
								th EIC
								th Way to pay
								th Email
								th.th-button
								th.th-button
						tbody
							tr(v-for="company in business")
								td(data-label="Company name") {{ company.bus_fullname }}
								td(data-label="EIC") {{ company.bus_eic }}
								td(data-label="Way to pay") {{ parseInt(company.bus_payment_method) | payment-method-name }}
								td(data-label="Email") {{ company.bus_email }}
								td.td-button
									button.button.is-rounded.is-link(v-on:click="goToMaintenanceBusinessForm(company.bus_id)")
										span.icon
											i.fa.fa-pencil-square-o(aria-hidden='true')
										span Edit
								td.td-button
									button.button.is-rounded.is-danger(v-on:click="showModalConfirmDeleteBusiness(company.bus_id, company.bus_fullname)")
										span.icon
											i.fa.fa-trash-o(aria-hidden='true')
										span Delete
					p-c-loader(v-show="isLoading")
		p-c-modal-confirm(v-on:modal-confirm-delete-busines="deleteBusiness")

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
			this.getListBusiness()
		},
		computed: {
			resultMessage () {
				if (this.business.length === 0) {
					return `No se encontraron resultados`
				} else {
					return `Encontrados: ${this.business.length}`
				}
			}
		},
		methods: {
			getListBusiness () {
				businessService.GetListBusiness(this.searchQuery)
					.then(res => {
						this.isLoading = false
						this.business = res
					})
			},
			goToMaintenanceBusinessForm (id) {
				this.$router.push({ name: 'maintenance-business-form-id', params: { id } })
			},
			showModalConfirmDeleteBusiness (id, fullname) {
				this.modalConfirm.title = 'Remove company'
				this.modalConfirm.id = id
				this.modalConfirm.body = `Do you want to remove ${fullname}?`
				this.modalConfirm.eventListener = 'modal-confirm-delete-busines'
				this.$bus.$emit('set-modal-confirm', this.modalConfirm)
			},
			deleteBusiness (id) {
				this.bus_ids.push({id})
				this.isLoading = true
				businessService.DeleteBusiness(this.bus_ids)
					.then(res => {
						this.isLoading = false
						this.notification = res
						this.$bus.$emit('set-notification', this.notification)
						if (this.notification.response) {
							this.getListBusiness()
							this.notification = {}
						}
					})
				this.bus_ids = []
			}
		}
	}
</script>