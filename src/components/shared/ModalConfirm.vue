<template lang="pug">
	
	.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalCenterTitle', aria-hidden='true', v-bind:class="{'show': showModalConfirm}", v-bind:style="{display: styleDisplay}")
		.modal-dialog.modal-dialog-centered(role='document')
			.modal-content
				.modal-header.text-white(v-bind:class="'bg-' + modalConfirm.action")
					h5.modal-title {{ modalConfirm.title }}
					.close.text-white(data-dismiss='modal', aria-label='Close', aria-hidden='true', v-on:click='deleteModalConfirm')
						i.fa.fa-times(aria-hidden="true")
				.modal-body
					| {{ modalConfirm.body }}
				.modal-footer
					.btn.btn-light(v-on:click="deleteModalConfirm") Cancel
					.btn(v-bind:class="'btn-' + modalConfirm.action", v-on:click="acceptModalConfirm(modalConfirm.data)") Accept

</template>

<script>
	export default {
		data ()	{
			return {
				modalConfirm: {},
				styleDisplay: 'none',
				showModalConfirm: false
			}
		},
		created () {
			this.$bus.$on('set-modal-confirm', (modalConfirm) => {
				this.modalConfirm = modalConfirm
				if (modalConfirm) {
					this.showModalConfirm = true
					this.styleDisplay = 'block'
				}
			})
		},
		methods: {
			deleteModalConfirm () {
				this.showModalConfirm = false
				this.styleDisplay = 'none'
				this.modalConfirm = {}
			},
			acceptModalConfirm (data) {
				this.$emit(this.modalConfirm.eventListener, data)
				this.deleteModalConfirm()
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>