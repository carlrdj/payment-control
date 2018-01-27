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

		.row.bg-white.rounded.box-shadow.pt-4.pb-4
			.col-12
				form.row(@submit.prevent="showModalConfirmSaveBusiness", v-bind:class="{'was-validated': formBusinessValidated}")
					.col-12.col-sm-6
						.form-group
							label(for='bus_fullname') Company name
								.badge.badge-danger Required !
							input#bus_fullname.form-control(
								type='text',
								v-model="company.bus_fullname",
								placeholder='Company name',
								v-bind:disabled="disabled"
								required)

					.col-12.col-sm-6
						.form-group
							label(for='bus_eic') EIC
								.badge.badge-danger Required !
							input#bus_eic.form-control(
								type='text',
								v-model="company.bus_eic",
								placeholder='EIC',
								v-bind:disabled="disabled"
								required)

					.col-12.col-sm-4
						.form-group
							label(for='bus_payment_method') Example select
								.badge.badge-danger Required !
							select#bus_payment_method.form-control(v-model="company.bus_payment_method", required, :disabled="disabled")
								option(value="", disabled) Select
								option(value="1", :selected="company.bus_payment_method == 1") {{ 1 | payment-method-name}}
								option(value="7", :selected="company.bus_payment_method == 1") {{ 7 | payment-method-name}}
								option(value="15", :selected="company.bus_payment_method == 1") {{ 15 | payment-method-name}}
								option(value="30", :selected="company.bus_payment_method == 1") {{ 30 | payment-method-name}}

					.col-12.col-sm-8
						.form-group
							label(for='bus_address') Address
								.badge.badge-danger Required !
							input#bus_address.form-control(
								type='text',
								v-model="company.bus_address",
								placeholder='Address',
								v-bind:disabled="disabled"
								required)

					.col-12.col-sm-6
						.form-group
							label(for='bus_email') Email
								.badge.badge-danger Required !
							input#bus_email.form-control(
								type='email',
								v-model="company.bus_email",
								placeholder='Email',
								v-bind:disabled="disabled"
								required)

					.col-12.col-sm-6
						.form-group
							label(for='bus_phone') Phone number
							input#bus_phone.form-control(
								type='text',
								v-model="company.bus_phone",
								placeholder='Phone number',
								v-bind:disabled="disabled")

					.col-12.text-center
						button.btn.btn-primary.btn-lg.pl-5.pr-5(type="submit", :disabled="disabled", v-on:click="validateFormBusiness") Save
							i(v-bind:class="{'fa | fa-spinner | fa-pulse | fa-fw  | is-loading': disabled}")
							

		p-c-modal-confirm(
		v-on:modal-confirm-insert-business="insertBusiness",
		v-on:modal-confirm-update-business="updateBusiness",
		)
</template>

<script>
	import businessService from '@/services/business'
	import PCModalConfirm from '@/components/shared/ModalConfirm.vue'
	export default {
		components: {
			PCModalConfirm
		},
		data () {
			return {
				title: 'Add business',
				company: {},
				notification: {},
				modalConfirm: {},
				disabled: false,
				formBusinessValidated: false
			}
		},
		created () {
			const self = this
			const id = this.$route.params.id
			businessService.GetBusinessById(id)
				.then(res => {
					if (res) {
						self.title = 'Edit business'
						self.company = res
					} else {
						self.company = {}
					}
				})
		},
		methods: {
			validateFormBusiness () {
				const self = this
				self.formBusinessValidated = true
			},
			showModalConfirmSaveBusiness () {
				const self = this
				if (self.company.bus_id) {
					self.modalConfirm.action = 'primary'
					self.modalConfirm.title = 'Update company'
					self.modalConfirm.data = {}
					self.modalConfirm.body = `Do you want to update ${self.company.bus_fullname}?`
					self.modalConfirm.eventListener = 'modal-confirm-update-business'
					self.$bus.$emit('set-modal-confirm', self.modalConfirm)
				} else {
					self.modalConfirm.action = 'primary'
					self.modalConfirm.title = 'Add company'
					self.modalConfirm.data = {}
					self.modalConfirm.body = `Do you want to add company?`
					self.modalConfirm.eventListener = 'modal-confirm-insert-business'
					self.$bus.$emit('set-modal-confirm', self.modalConfirm)
				}
			},
			insertBusiness (data) {
				const self = this
				self.disabled = true
				businessService.InsertBusiness(self.company)
					.then(res => {
						self.$router.push({ name: 'maintenance-business' })
						self.notification = res
						self.$bus.$emit('set-notification', self.notification)
						self.disabled = false
						self.formBusinessValidated = false
					})
			},
			updateBusiness (data) {
				const self = this
				self.disabled = true
				businessService.UpdateBusiness(self.company)
					.then(res => {
						self.notification = res
						self.$bus.$emit('set-notification', self.notification)
						self.$router.push({ name: 'maintenance-business' })
						self.notification = {}
						self.disabled = false
						self.formBusinessValidated = false
					})
			}
		}
	}
</script>