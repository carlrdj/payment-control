import Business from '@/components/maintenance/business/Business.vue'
import BusinessForm from '@/components/maintenance/business/BusinessForm.vue'

const routes = [
	{ path: '/', component: Business, name: 'home' },
	{ path: '/maintenance/business', component: Business, name: 'maintenance-business' },
	{ path: '/maintenance/business/form', component: BusinessForm, name: 'maintenance-business-form' },
	{ path: '/maintenance/business/form/:id', component: BusinessForm, name: 'maintenance-business-form-id' }
]

export default routes
