<template lang="pug">
	nav.navbar.is-fixed-top.is-link
		.container
			.navbar-brand
				a.navbar-item(href='https://bulma.io')
					img(src='https://bulma.io/images/bulma-logo.png', alt='Bulma: a modern CSS framework based on Flexbox', width='112', height='28')
				.navbar-burger.burger(data-target='navbarExampleTransparentExample')
					span
					span
					span
			#navbarExampleTransparentExample.navbar-menu
				.navbar-start
					router-link.navbar-item(to="/")
						| Home
					.navbar-item.has-dropdown.is-hoverable
						router-link.navbar-link(to="/")
							| Maintenance
						.navbar-dropdown.is-boxed
							router-link.navbar-item(to="/maintenance/business")
								| Business
							hr.navbar-divider
							router-link.navbar-item(to="/maintenance/employees")
								| Employees
				.navbar-end
					.navbar-item
						.field.is-grouped
							p.control
							p.control

		p-c-notification
</template>

<script>
	import PCNotification from '@/components/shared/Notification.vue'
	export default {
		components: {
			PCNotification
		}
	}

	document.addEventListener('DOMContentLoaded', function () {
		let $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

		if ($navbarBurgers.length > 0) {
			$navbarBurgers.forEach(function ($el) {
				$el.addEventListener('click', function () {
					var target = $el.dataset.target
					var $target = document.getElementById(target)

					$el.classList.toggle('is-active')
					$target.classList.toggle('is-active')
				})
			})
		}
	})
</script>