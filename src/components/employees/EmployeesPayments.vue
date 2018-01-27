<template lang="pug">
	.container.main-container
		.row.bg-white.rounded.box-shadow.mb-3.pt-2.pb-2
			.col-8
				h2 {{ title }}

		.row.bg-white.rounded.box-shadow.pt-4.pb-4
			.col-12
				form.row(@submit.prevent="showModalConfirmSavePaymentEmployees", v-bind:class="{'was-validated': formPaymentEmployeesValidated}")
					template(v-for="emp in employees")
						.col-6.d-flex.align-items-end.flex-column.justify-content-center
							h6.pr-5 {{ emp.emp_fullname }}

						.col-6
							.form-group.col-12.col-sm-4
								label(:for='emp.emp_id') Salary
									.badge.badge-danger Required !
								input.form-control(
									:id="emp.emp_id"
									type='number',
									placeholder='0.00',
									v-bind:disabled="disabled"
									required)

					.col-12.text-center
						button.btn.btn-primary.btn-lg.pl-5.pr-5(type="submit", :disabled="disabled", v-on:click="validateFormPaymentEmployees") Save
							i(v-bind:class="{'fa | fa-spinner | fa-pulse | fa-fw  | is-loading': disabled}")

		p-c-loader(v-show="isLoading")
		p-c-modal-confirm()
</template>

<script>
	import employeesService from '@/services/employees'
	import PCLoader from '@/components/shared/Loader.vue'
	import PCModalConfirm from '@/components/shared/ModalConfirm.vue'
	export default {
		components: {
			PCModalConfirm, PCLoader
		},
		data ()	{
			return {
				title: 'Register payments',
				employees: [],
				modalConfirm: {},
				notification: {},
				isLoading: true,
				disabled: false,
				formPaymentEmployeesValidated: false,
				ID_DE_PRUBAAAA: 68
			}
		},
		created () {
			this.getListEmployeesByBusinessBy(this.ID_DE_PRUBAAAA)
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
			getListEmployeesByBusinessBy (id) {
				employeesService.GetListEmployeesByBusinessBy(id)
					.then(res => {
						console.log(res)
						this.isLoading = false
						this.employees = res
					})
			},
			showModalConfirmSavePaymentEmployees () {
				console.log('showModalConfirmSavePaymentEmployees')
			},
			validateFormPaymentEmployees () {
				this.formPaymentEmployeesValidated = true
				console.log('validateFormPaymentEmployees')
			}
		}
	}
</script>