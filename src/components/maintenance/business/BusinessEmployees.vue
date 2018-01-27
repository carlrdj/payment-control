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

		.row.bg-white.rounded.box-shadow.mb-3.pt-4.pb-4
			.col-12
				form.row(@submit.prevent="showModalConfirmSaveEmployees", v-bind:class="{'was-validated': formEmployeesValidated}")
					.col-12.col-sm-8
						.form-group
							label(for='emp_fullname') Fullname
								.badge.badge-danger Required !
							input#emp_fullname.form-control(
								type='text',
								v-model="employee.emp_fullname",
								placeholder='Fullname',
								v-bind:disabled="disabled"
								required)

					.col-12.col-sm-4.d-flex.align-items-center.justify-content-center
						button.btn.btn-primary.btn-lg.pl-3.pr-3(type="submit", :disabled="disabled", v-on:click="validateFormEmployees") Save
							i(v-bind:class="{'fa | fa-spinner | fa-pulse | fa-fw  | is-loading': disabled}")

						.btn.btn-dark.btn-lg.ml-2.pl-3.pr-3(:disabled="disabled", v-on:click="cancelUpdateEmployees") Cancel
							i(v-bind:class="{'fa | fa-spinner | fa-pulse | fa-fw  | is-loading': disabled}")

		.row.bg-white.rounded.box-shadow.pt-4.pb-2
			.col-12
				table.table.table-striped.table-hover
					thead
						tr
							th Fullname
							th.th-button
					tbody
						tr(v-for="emp in employees", v-bind:class="{ 'bg-primary | text-white':emp.emp_id == employee.emp_id }")
							td(data-label="Fullname") {{ emp.emp_fullname }}
							td.td-button
								.dropdown.dropleft
									button#dropdownMenuButtonBusinessEmployees.btn.btn-link.dropdown-toggle.dropdown-toggle-split(data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
										i.fa.fa-ellipsis-v(aria-hidden="true")
									.dropdown-menu(aria-labelledby='dropdownMenuButtonBusinessEmployees')
										.btn.btn-block.text-left(v-on:click="getEmployeesById(emp.emp_id)")
											span.icon
												i.fa.fa-pencil(aria-hidden='true')
											span Edit

										.btn.btn-block.text-left(v-on:click="showModalConfirmDeleteEmployees(emp.emp_id, emp.emp_fullname )")
											span.icon
												i.fa.fa-trash(aria-hidden='true')
											span Remove
		
		p-c-loader(v-show="isLoading")

		p-c-modal-confirm(
		v-on:modal-confirm-insert-employees="insertEmployees",
		v-on:modal-confirm-update-employees="updateEmployees",
		v-on:modal-confirm-delete-employees="deleteEmployees"
		)

</template>

<script>
	import businessService from '@/services/business'
	import employeesService from '@/services/employees'
	import PCModalConfirm from '@/components/shared/ModalConfirm.vue'
	import PCLoader from '@/components/shared/Loader.vue'
	export default {
		components: {
			PCModalConfirm, PCLoader
		},
		data ()	{
			return {
				title: '',
				emp_ids: [],
				company: {},
				employees: [],
				employee: {},
				modalConfirm: {},
				notification: {},
				isLoading: true,
				disabled: false,
				formEmployeesValidated: false
			}
		},
		created () {
			const self = this
			const id = self.$route.params.id
			self.getListEmployeesByBusinessBy(id)
			businessService.GetBusinessById(id)
				.then(res => {
					self.company = res
					self.title = `Employees of ${self.company.bus_fullname}`
				})
		},
		computed: {
			resultMessage () {
				const self = this
				if (self.employees.length === 0) {
					return `No se encontraron resultados`
				} else {
					return `Encontrados: ${self.employees.length}`
				}
			}
		},
		methods: {
			validateFormEmployees () {
				const self = this
				self.formEmployeesValidated = true
			},
			getListEmployeesByBusinessBy (id) {
				const self = this
				employeesService.GetListEmployeesByBusinessBy(68)
					.then(res => {
						self.isLoading = false
						self.employees = res
					})
			},
			showModalConfirmSaveEmployees () {
				const self = this
				if (self.employee.emp_id) {
					self.modalConfirm.action = 'primary'
					self.modalConfirm.title = 'Update employee'
					self.modalConfirm.data = {'bus_id': self.company.bus_id}
					self.modalConfirm.body = `Do you want to update ${self.employee.emp_fullname}?`
					self.modalConfirm.eventListener = 'modal-confirm-update-employees'
					self.$bus.$emit('set-modal-confirm', self.modalConfirm)
				} else {
					self.modalConfirm.action = 'primary'
					self.modalConfirm.title = 'Add employee'
					self.modalConfirm.data = {'bus_id': self.company.bus_id}
					self.modalConfirm.body = `Do you want to add employee?`
					self.modalConfirm.eventListener = 'modal-confirm-insert-employees'
					self.$bus.$emit('set-modal-confirm', self.modalConfirm)
				}
			},
			showModalConfirmDeleteEmployees (id, fullname) {
				const self = this
				self.modalConfirm.action = 'danger'
				self.modalConfirm.title = 'Remove employee'
				self.modalConfirm.data = {'id': id}
				self.modalConfirm.body = `Do you want to remove ${fullname}?`
				self.modalConfirm.eventListener = 'modal-confirm-delete-employees'
				self.$bus.$emit('set-modal-confirm', self.modalConfirm)
			},
			getEmployeesById (id) {
				const self = this
				employeesService.GetEmployeesById(id)
					.then(res => {
						self.employee = res
					})
			},
			insertEmployees (data) {
				const self = this
				self.disabled = true
				self.employee.bus_id = data.bus_id
				employeesService.InsertEmployees(self.employee)
					.then(res => {
						self.notification = res
						self.$bus.$emit('set-notification', self.notification)
						self.notification = {}
						self.disabled = false
						self.isLoading = true
						self.formEmployeesValidated = false
						self.getListEmployeesByBusinessBy(data.bus_id)
					})
				self.employee = {}
			},
			updateEmployees (data) {
				const self = this
				self.disabled = true
				employeesService.UpdateEmployees(self.employee)
					.then(res => {
						self.notification = res
						self.$bus.$emit('set-notification', self.notification)
						self.notification = {}
						self.disabled = false
						self.isLoading = true
						self.formEmployeesValidated = false
						self.getListEmployeesByBusinessBy(data.bus_id)
					})
				self.employee = {}
			},
			cancelUpdateEmployees () {
				const self = this
				self.employee = {}
			},
			deleteEmployees (data) {
				const self = this
				let id = data.id
				self.emp_ids.push({id})
				self.isLoading = true
				employeesService.DeleteEmployees(self.emp_ids)
					.then(res => {
						self.notification = res
						self.$bus.$emit('set-notification', self.notification)
						self.notification = {}
						self.getListEmployeesByBusinessBy(self.company.bus_id)
					})
				self.emp_ids = []
			}
		}
	}
</script>