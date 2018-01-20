<template lang="pug">
	.container
		.columns
			.column.is-four-fifths
				h1.title {{ title }}
			.column.has-text-right
				router-link.button.is-rounded.is-danger(to="/maintenance/business")
					span.icon
						i.fa.fa-angle-left(aria-hidden='true')
					span Back
		.box
			form(@submit.prevent="saveBusiness")
				.columns.is-multiline
					.column.is-half
						.field
							label.label Company name
								span.tag.is-warning.is-pulled-right Required !
							.control
								input.input(type="text", placeholder="Company name", v-model="company.bus_fullname", required, :disabled="disabled")

					.column.is-half
						.field
							label.label EIC
								span.tag.is-warning.is-pulled-right Required !
							.control
								input.input(type="text", placeholder="EIC", v-model="company.bus_eic", required, :disabled="disabled")

					.column.is-one-third
						.field
							label.label Way to pay
								span.tag.is-warning.is-pulled-right Required !
							.control
								.select.is-fullwidth
									select(v-model="company.bus_payment_method", required, :disabled="disabled")
										option(value="", disabled) Select
										option(value="1", :selected="company.bus_payment_method == 1") {{ 1 | payment-method-name}}
										option(value="7", :selected="company.bus_payment_method == 1") {{ 7 | payment-method-name}}
										option(value="15", :selected="company.bus_payment_method == 1") {{ 15 | payment-method-name}}
										option(value="30", :selected="company.bus_payment_method == 1") {{ 30 | payment-method-name}}

					.column.is-two-thirds
						.field
							label.label Address
								span.tag.is-warning.is-pulled-right Required !
							.control
								input.input(type="text", placeholder="Address", v-model="company.bus_address", required, :disabled="disabled")

					.column.is-two-quarter
						.field
							label.label Email
								span.tag.is-warning.is-pulled-right Required !
							.control
								input.input(type="text", placeholder="Email", v-model="company.bus_email", required, :disabled="disabled")

					.column.is-two-quarter
						.field
							label.label Phone number
							.control
								input.input(type="text", placeholder="Phone number", v-model="company.bus_phone", :disabled="disabled")

					.column.is-12
						.field.is-grouped.is-grouped-centered
							.control
								button.button.is-medium.is-link(type="submit", :disabled="disabled", v-bind:class="{'is-loading': disabled}") SAVE


</template>

<script>
	import businessService from '@/services/business'
	export default {
		data () {
			return {
				title: 'Add business',
				company: {},
				notification: {},
				disabled: false
			}
		},
		created () {
			const id = this.$route.params.id
			businessService.GetBusinessById(id)
				.then(res => {
					if (res) { this.title = 'Edit business' }
					this.company = res
				})
		},
		methods: {
			saveBusiness () {
				this.disabled = true
				if (this.company.bus_id) {
					businessService.UpdateBusiness(this.company)
						.then(res => {
							this.notification = res
							this.$bus.$emit('set-notification', this.notification)
							if (this.notification.response) {
								this.$router.push({ name: 'maintenance-business' })
								this.notification = {}
								this.disabled = false
							}
						})
				} else {
					businessService.InsertBusiness(this.company)
						.then(res => {
							this.notification = res
							this.$bus.$emit('set-notification', this.notification)
							this.disabled = false
						})
				}
			}
		}
	}
</script>