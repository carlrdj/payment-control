<template lang="pug">
	.modal(v-bind:class="{'is-active': showModalConfirm}")
		.modal-background(v-on:click="deleteModalConfirm()")
		.modal-card
			header.modal-card-head
				p.modal-card-title {{ modalConfirm.title }}
				button.delete(aria-label="close", v-on:click="deleteModalConfirm()")
			section.modal-card-body
				content
					p.has-text-dark {{ modalConfirm.body }}
			footer.modal-card-foot
				button.button.is-medium.is-success(v-on:click="acceptModalConfirm(modalConfirm.id)") Accept
				button.button.is-medium(v-on:click="deleteModalConfirm()") Cancel
</template>

<script>
	export default {
		data ()	{
			return {
				modalConfirm: {},
				showModalConfirm: false
			}
		},
		created () {
			this.$bus.$on('set-modal-confirm', (modalConfirm) => {
				this.modalConfirm = modalConfirm
				if (modalConfirm) {
					this.showModalConfirm = true
				}
			})
		},
		methods: {
			deleteModalConfirm () {
				this.showModalConfirm = false
				this.modalConfirm = {}
			},
			acceptModalConfirm (id) {
				this.$emit(this.modalConfirm.eventListener, id)
				this.deleteModalConfirm()
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>