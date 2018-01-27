import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from '@/routes'
import EventBus from '@/plugins/event-bus'

import paymentMethodName from '@/filters/payment-method-name'
import millisecondsToFormattedDate from '@/filters/milliseconds-to-formatted-date'
import dateToMilliseconds from '@/filters/date-to-milliseconds'
import usersService from '@/services/users'

Vue.use(VueRouter)
Vue.use(EventBus)
Vue.use(paymentMethodName)
Vue.use(millisecondsToFormattedDate)
Vue.use(dateToMilliseconds)

const router = new VueRouter({
	routes,
	mode: 'history'
})

usersService.GetCheckToken(window.localStorage.token)
	.then(res => {
	})

const isAuthentificated = () => {
	return window.localStorage.token
}

router.beforeEach((to, from, next) => {
	let timer = new Date().getTime()
	if ((timer - window.localStorage.timer) <= 300000) {
		window.localStorage.setItem('timer', timer)
	} else {
		window.localStorage.clear()
	}
	if (!to.meta.isPublic && !isAuthentificated()) {
		return next('/login')
	}
	if (!to.name === 'login' && isAuthentificated()) {
		return next('/')
	}
	return next()
})

new Vue({
	el: '#app',
	render: h => h(App),
	router
})
