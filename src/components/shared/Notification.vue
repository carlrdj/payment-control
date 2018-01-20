<template lang="pug">
	.notification.is-shadow(v-if="notification", v-show="showNotification", :class="notification.class")
		button.delete(v-on:click="closeNotification()")
		span {{ notification.message }}
</template>

<script>
	export default {
		data ()	{
			return {
				notification: {},
				showNotification: false
			}
		},
		created () {
			this.$bus.$on('set-notification', (notification) => {
				this.showNotification = true
				this.notification = notification
			})
		},
		watch: {
			showNotification () {
				if (this.showNotification) {
					setTimeout(() => {
						this.showNotification = false
						this.notification = {}
					}, 3000)
				}
			}
		},
		methods: {
			closeNotification () {
				this.showNotification = false
				this.notification = {}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.notification{
		position: fixed;
		top: 70px;
		right: 20px;
		width: 310px;
	}
</style>