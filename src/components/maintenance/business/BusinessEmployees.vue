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
					form(@submit.prevent="showModalConfirmSaveEmployees")
						.columns
							.column.is-four-fifths
								.field
									label.label Fullname
										span.tag.is-warning.is-pulled-right Required !
									.control
										input.input(type="text", placeholder="Fullname", v-model="employee.emp_fullname", required, :disabled="disabled")
							.column
								.field.is-grouped.is-grouped-centered
									.control
										button.button.is-medium.is-link(type="submit", :disabled="disabled", v-bind:class="{'is-loading': disabled}") SAVE
			.columns
				.column
					table.table.is-fullwidth.is-hoverable.is-striped
						thead
							tr
								th Fullname
								th.th-button
								th.th-button
						tbody
							tr(v-for="emp in employees")
								td(data-label="Fullname", v-bind:class="{ 'has-text-info | has-text-weight-bold':emp.emp_id == employee.emp_id }") {{ emp.emp_fullname }}
								td.td-button
									button.button.is-rounded.is-link(v-on:click="getEmployeesById(emp.emp_id)")
										span.icon
											i.fa.fa-pencil-square-o(aria-hidden='true')
										span Edit
								td.td-button
									button.button.is-rounded.is-danger(v-on:click="showModalConfirmDeleteEmployees(emp.emp_id, emp.emp_fullname )")
										span.icon
											i.fa.fa-trash-o(aria-hidden='true')
										span Delete
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
				disabled: false
			}
		},
		created () {
			const id = this.$route.params.id
			this.getListEmployeesByBusinessBy(id)
			businessService.GetBusinessById(id)
				.then(res => {
					this.company = res
					this.title = `Employees of ${this.company.bus_fullname}`
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
			getListEmployeesByBusinessBy (id) {
				employeesService.GetListEmployeesByBusinessBy(68)
					.then(res => {
						this.isLoading = false
						this.employees = res
					})
			},
			showModalConfirmSaveEmployees () {
				if (this.employee.emp_id) {
					this.modalConfirm.title = 'Update employee'
					this.modalConfirm.id = this.company.bus_id
					this.modalConfirm.body = `Do you want to update ${this.employee.emp_fullname}?`
					this.modalConfirm.eventListener = 'modal-confirm-update-employees'
					this.$bus.$emit('set-modal-confirm', this.modalConfirm)
				} else {
					this.modalConfirm.title = 'Add employee'
					this.modalConfirm.id = this.company.bus_id
					this.modalConfirm.body = `Do you want to add employee?`
					this.modalConfirm.eventListener = 'modal-confirm-insert-employees'
					this.$bus.$emit('set-modal-confirm', this.modalConfirm)
				}
			},
			showModalConfirmDeleteEmployees (id, fullname) {
				this.modalConfirm.title = 'Add employee'
				this.modalConfirm.id = id
				this.modalConfirm.body = `Do you want to remove ${fullname}?`
				this.modalConfirm.eventListener = 'modal-confirm-delete-employees'
				this.$bus.$emit('set-modal-confirm', this.modalConfirm)
			},
			getEmployeesById (id) {
				employeesService.GetEmployeesById(id)
					.then(res => {
						this.employee = res
					})
			},
			insertEmployees (id) {
				this.disabled = true
				this.employee.bus_id = id
				employeesService.InsertEmployees(this.employee)
					.then(res => {
						this.notification = res
						this.$bus.$emit('set-notification', this.notification)
						this.notification = {}
						this.disabled = false
						this.isLoading = true
						this.getListEmployeesByBusinessBy(id)
					})
				this.employee = {}
			},
			updateEmployees (id) {
				this.disabled = true
				employeesService.UpdateEmployees(this.employee)
					.then(res => {
						this.notification = res
						this.$bus.$emit('set-notification', this.notification)
						this.notification = {}
						this.disabled = false
						this.isLoading = true
						this.getListEmployeesByBusinessBy(id)
					})
				this.employee = {}
			},
			deleteEmployees (id) {
				this.emp_ids.push({id})
				this.isLoading = true
				employeesService.DeleteEmployees(this.emp_ids)
					.then(res => {
						this.notification = res
						this.$bus.$emit('set-notification', this.notification)
						this.notification = {}
						this.getListEmployeesByBusinessBy(this.company.bus_id)
					})
				this.emp_ids = []
			}
		}
	}
</script>