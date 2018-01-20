import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from '@/routes'
import EventBus from '@/plugins/event-bus'

import paymentMethodName from '@/filters/payment-method-name'

Vue.use(VueRouter)
Vue.use(EventBus)
Vue.use(paymentMethodName)

const router = new VueRouter({
	routes,
	mode: 'history'
})

new Vue({
	el: '#app',
	render: h => h(App),
	router
})
