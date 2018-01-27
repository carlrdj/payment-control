import MaintenanceBusinessBusiness from '@/components/maintenance/business/Business.vue'
import MaintenanceBusinessBusinessForm from '@/components/maintenance/business/BusinessForm.vue'
import MaintenanceBusinessBusinessEmployees from '@/components/maintenance/business/BusinessEmployees.vue'
import MaintenanceBusinessBusinessCalendar from '@/components/maintenance/business/BusinessCalendar.vue'

import BusinessBusiness from '@/components/business/Business.vue'
import LoginLogin from '@/components/login/Login.vue'
import EmployeesEmployeesPayments from '@/components/employees/EmployeesPayments.vue'
import EmployeesScheduledPayments from '@/components/employees/ScheduledPayments.vue'

const routes = [
	{ path: '/', component: BusinessBusiness, name: 'home' },
	{ path: '/login', component: LoginLogin, name: 'login', meta: { isPublic: true } },
	{ path: '/payments', component: EmployeesScheduledPayments, name: 'scheduled-payments' },
	{ path: '/employees', component: EmployeesEmployeesPayments, name: 'employees-employees-payments' },
	{ path: '/maintenance/business', component: MaintenanceBusinessBusiness, name: 'maintenance-business' },
	{ path: '/maintenance/business/form', component: MaintenanceBusinessBusinessForm, name: 'maintenance-business-form' },
	{ path: '/maintenance/business/form/:id', component: MaintenanceBusinessBusinessForm, name: 'maintenance-business-form-id' },
	{ path: '/maintenance/business/employees/:id', component: MaintenanceBusinessBusinessEmployees, name: 'maintenance-business-employees-id' },
	{ path: '/maintenance/business/calendar/:id', component: MaintenanceBusinessBusinessCalendar, name: 'maintenance-business-calendar-id' }
]

export default routes
