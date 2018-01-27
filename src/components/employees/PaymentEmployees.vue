<template lang="pug">
	div
		h6.bg-dark.text-white.rounded.box-shadow.mb-3.p-3(v-if="payment.pay_id") {{ payment.pay_date | milliseconds-to-formatted-date }}
		form.row(@submit.prevent="showModalConfirmSavePaymentEmployees", v-bind:class="{'was-validated': formPaymentEmployeesValidated}", v-if="paymentEnable")
			template(v-for="(emp, index) in employees")
				.col-6.d-flex.align-items-end.flex-column.justify-content-center
					h6.pr-5 {{ emp.emp_fullname }}

				.col-6
					.form-group.col-12.col-sm-8.col-md-12.col-lg-12
						label(:for='emp.emp_id') Salary
						.input-group.mb-2
							.input-group-prepend
								.input-group-text.bg-white
									i.fa.fa-usd(aria-hidden="true")
							input(type='hidden', v-model='formPaymentEmployees.emp_id[index] = emp.emp_id')
							input.form-control.text-right(
								:id="emp.emp_id"
								v-model="formPaymentEmployees.pay_emp_salary[index] = payEmpSalary[emp.emp_id]"
								v-bind:disabled="disabled",
								type='number',
								placeholder='0.00',
								max="99999",
								min="0",
								step="0.01")

			.col-12.text-center(v-if="!disabled")
				button.btn.btn-primary.btn-lg.pl-5.pr-5(type="submit",v-if="employees.length" :disabled="disabled") Save 
					i(v-bind:class="{'fa | fa-spinner | fa-pulse | fa-fw  | is-loading': disabled}")

		table.table(v-if="!paymentEnable", v-show="employeesPaymentEmployees.length")
			thead
				tr
					th Fullname
					th Amount
			tbody
				tr(v-for="emp_pay_emp in employeesPaymentEmployees")
					td {{ emp_pay_emp.emp_fullname }}
					td.d-flex.justify-content-between
						span
							i.fa.fa-usd(aria-hidden="true")
						span {{ emp_pay_emp.pay_emp_salary }}

</template>

<script>
	
	import employeesService from '@/services/employees'
	import PCModalConfirm from '@/components/shared/ModalConfirm.vue'
	export default {
		components: {
			PCModalConfirm
		},
		props: {
			payment: {type: Object, required: true},
			paymentEnable: {type: Boolean, required: true},
			paymentEmployees: {type: Array, required: true},
			employeesPaymentEmployees: {type: Array, required: true}
		},
		data ()	{
			return {
				employees: [],
				disabled: false,
				modalConfirm: {},
				formPaymentEmployees: {
					emp_id: [],
					pay_emp_salary: []
				},
				payEmpSalary: [],
				totalAmount: 0,
				formPaymentEmployeesValidated: false
			}
		},
		created () {
			const self = this
			self.getListEmployeesByBusinessBy(self.payment.bus_id)
		},
		methods: {
			getListEmployeesByBusinessBy (id) {
				const self = this
				employeesService.GetListEmployeesByBusinessBy(id)
					.then(res => {
						self.isLoading = false
						self.employees = res
						self.getPayEmpSalary()
					})
			},
			getPayEmpSalary () {
				const self = this
				self.payEmpSalary = []
				for (var i = 0; i < self.paymentEmployees.length; i++) {
					self.payEmpSalary[self.paymentEmployees[i].emp_id] = self.paymentEmployees[i].pay_emp_salary
				}
			},
			showModalConfirmSavePaymentEmployees () {
				const self = this
				let paymentEmployees = []
				for (var i = 0; i < self.formPaymentEmployees.emp_id.length; i++) {
					let payEmpSalary = self.formPaymentEmployees.pay_emp_salary[i]
					if (payEmpSalary < 0.01) {
						payEmpSalary = 0.00
					}
					paymentEmployees.push({'emp_id': self.formPaymentEmployees.emp_id[i], 'pay_emp_salary': payEmpSalary})
				}
				self.modalConfirm.action = 'primary'
				self.modalConfirm.title = 'Save'
				self.modalConfirm.data = {'id': self.payment.pay_id, 'data': paymentEmployees, 'disabled': true, 'isLoading': true}
				self.modalConfirm.body = `You want to save?`
				self.modalConfirm.eventListener = 'modal-confirm-save-payment-employees'
				self.$bus.$emit('set-modal-confirm', self.modalConfirm)
			}
		},
		watch: {
			payment () {
				this.getListEmployeesByBusinessBy(this.payment.bus_id)
			}
		}
	}
</script>