<template lang="pug">
	#app
		header
			.navbar-fixed
				nav
					.nav-wrapper
						a.brand-logo.left.hide-on-med-and-down Hola
						a.brand-logo.center.hide-on-large-only Hola
						.button-collapse.pointer.hide-on-large-only(
							data-activates="NavMobile", 
							data-sidenav="left", 
							data-closeonclick="false")
							i.material-icons menu
						ul.right.show-on-large-and-down
							li
								a.dropdown-button.pointer(data-activates='MoreOptions', dropdown data-hover="true")
									i.material-icons more_vert

			ul#MoreOptions.dropdown-content
				li
					a Ver Perfil
				li.divider
				li
					a(data-target="ModalSignOut") Salir


			ul#NavMobile.side-nav.fixed
				li
					.userView
						.background
							img(src='./assets/images/background-nav-profile.jpg')
						a(href='#')
							img.circle(src='', title='sd')
						a(href='#')
							span.white-text.name aaaa
						a(href='#')
							span.white-text.email sss
				li
					a(href='/')
						i.material-icons home
						| Inicio
				li
					a(href='/user')
						i.material-icons perm_identity
						| Usuarios
				li(routerlinkactive='active')
					a(routerlink='/vehicle')
						i.material-icons directions_car
						| Vehiculos
				li
					a(href='#!', data-target='ModalSignOut')
						i.material-icons exit_to_app
						| Salir

		main
			router-view
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style lang="scss">
</style>
