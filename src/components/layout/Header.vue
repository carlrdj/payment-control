<template lang="pug">
	header
		nav.navbar.navbar-expand-lg.fixed-top.navbar-dark.bg-primary
			.container
				router-link.navbar-brand(to="/") Offcanvas navbar
				button.navbar-toggler.p-0.border-0(type='button', v-on:click="offcanvas")
					span.navbar-toggler-icon
				#navbars.navbar-collapse.offcanvas-collapse
					ul.navbar-nav.mr-auto
						li.nav-item.active
							router-link.nav-link(to="/")
								| Home 
								span.sr-only (current)
						li.nav-item.active.dropdown
							#dropdownMaintenance.nav-link.cursor-pointer.dropdown-toggle(data-toggle='dropdown', aria-haspopup='true', aria-expanded='false') Maintenance
							.dropdown-menu(aria-labelledby='dropdownMaintenance')
								router-link.dropdown-item(to="/maintenance/business") Business

					.my-2.my-lg-0
						ul.navbar-nav.mr-auto
							li.nav-item.active
								.nav-link.cursor-pointer(v-on:click="signOut") Sign out
								
		p-c-notification
</template>

<script>
	import PCNotification from '@/components/shared/Notification.vue'
	export default {
		components: {
			PCNotification
		},
		methods: {
			offcanvas () {
				document.getElementById('navbars').classList.toggle('open')
			},
			signOut () {
				const self = this
				window.localStorage.clear()
				self.$router.push({ name: 'login' })
			}
		}
	}
</script>

<style>
	@media (max-width: 767.98px) {
	.offcanvas-collapse {
		position: fixed;
		top: 56px; /* Height of navbar */
		bottom: 0;
		width: 100%;
		padding-right: 1rem;
		padding-left: 1rem;
		overflow-y: auto;
		background-color: rgba(0,0,0,.9);
		transition: -webkit-transform .3s ease-in-out;
		transition: transform .3s ease-in-out;
		transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out;
		-webkit-transform: translateX(100%);
		transform: translateX(100%);
	}
	.offcanvas-collapse.open {
		-webkit-transform: translateX(-1rem);
		transform: translateX(-1rem);
	}
}

.nav-scroller {
	position: relative;
	z-index: 2;
	height: 2.75rem;
	overflow-y: hidden;
}

.nav-scroller .nav {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-wrap: nowrap;
	flex-wrap: nowrap;
	padding-bottom: 1rem;
	margin-top: -1px;
	overflow-x: auto;
	color: rgba(255, 255, 255, .75);
	text-align: center;
	white-space: nowrap;
	-webkit-overflow-scrolling: touch;
}

.nav-underline .nav-link {
	padding-top: .75rem;
	padding-bottom: .75rem;
	font-size: .875rem;
	color: var(--secondary);
}

.nav-underline .nav-link:hover {
	color: var(--blue);
}

.nav-underline .active {
	font-weight: 500;
	color: var(--gray-dark);
}

.text-white-50 { color: rgba(255, 255, 255, .5); }

.bg-purple { background-color: var(--purple); }

.border-bottom { border-bottom: 1px solid #e5e5e5; }

.box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }

.lh-100 { line-height: 1; }
.lh-125 { line-height: 1.25; }
.lh-150 { line-height: 1.5; }
</style>