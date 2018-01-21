import MaintenanceBusinessBusiness from '@/components/maintenance/business/Business.vue'
import MaintenanceBusinessBusinessForm from '@/components/maintenance/business/BusinessForm.vue'
import MaintenanceBusinessBusinessEmployees from '@/components/maintenance/business/BusinessEmployees.vue'
import MaintenanceBusinessBusinessCalendar from '@/components/maintenance/business/BusinessCalendar.vue'

const routes = [
	{ path: '/', component: MaintenanceBusinessBusiness, name: 'home' },
	{ path: '/maintenance/business', component: MaintenanceBusinessBusiness, name: 'maintenance-business' },
	{ path: '/maintenance/business/form', component: MaintenanceBusinessBusinessForm, name: 'maintenance-business-form' },
	{ path: '/maintenance/business/form/:id', component: MaintenanceBusinessBusinessForm, name: 'maintenance-business-form-id' },
	{ path: '/maintenance/business/employees/:id', component: MaintenanceBusinessBusinessEmployees, name: 'maintenance-business-employees-id' },
	{ path: '/maintenance/business/calendar/:id', component: MaintenanceBusinessBusinessCalendar, name: 'maintenance-business-calendar-id' }
]

export default routes
