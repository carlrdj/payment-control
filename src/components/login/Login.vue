<template lang="pug">
	.login-page
		.form
			div.login-form
				input(type='text', placeholder='username', v-model="user.use_user")
				input(type='password', placeholder='password', v-model="user.use_password")
				.button(v-on:click="getAuthentication") login

		p-c-loader(v-show="isLoading")

</template>

<script>
	import usersService from '@/services/users'
	import PCLoader from '@/components/shared/Loader.vue'
	export default {
		components: {
			PCLoader
		},
		data ()	{
			return {
				user: {},
				isLoading: false,
				notification: {}
			}
		},
		created () {
		},
		computed: {
		},
		methods: {
			getAuthentication () {
				const self = this
				usersService.GetAuthentication(self.user)
					.then(res => {
						if (res) {
							if (res.response) {
								window.localStorage.setItem('use_nickname', res[0][0].use_nickname)
								window.localStorage.setItem('token', res[0][1].use_token)
								window.localStorage.setItem('timer', new Date().getTime())
								window.location = '/'
							} else {
								self.notification = res
								self.$bus.$emit('set-notification', self.notification)
								self.notification = {}
							}
						}
						self.isLoading = false
					})
			}
		}
	}
</script>


<style>
.navbar{
	display: none;
}
.login-page {
  width: 360px;
  padding: 15% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form .button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #343A40;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active {
  background: #6C757D;
}
body {
	width: 100wh;
	height: 90vh;
	color: #fff;
	background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
	background-size: 400% 400%;
	-webkit-animation: Gradient 15s ease infinite;
	-moz-animation: Gradient 15s ease infinite;
	animation: Gradient 15s ease infinite;
}

@-webkit-keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

@-moz-keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

@keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}
footer{
	color: #343A40;
}
</style>