<template>
	<div class="admin-panel">
		<div class="container login-container" v-if="$parent.isAdminLoggedIn == false">
			<img src="/logo.png" class="logo">
			<p class="h3">Admin Panel</p>
			<form @submit.prevent="login()">
				<div class="form-group">
					<input type="text" placeholder="Username" v-model="username" autofocus>
				</div>
				<div class="form-group">
					<input type="password" placeholder="Password" v-model="password">
				</div>
				<div class="form-group">
					<button type="submit">Login</button>
					<div class="not">
						Not admin? <router-link to="/">Go back to home</router-link>
					</div>
				</div>
			</form>
		</div>
		<div class="container admin-container" v-if="$parent.isAdminLoggedIn">
			<div class="left-nav">
				<ul>
					<li><router-link to="/admin-panel/complaints"><i class="fa fa-hand-paper-o" aria-hidden="true"></i> Complaints</router-link></li>
					<li><router-link to="/admin-panel/users"><i class="fa fa-users" aria-hidden="true"></i> Users</router-link></li>
					<li><router-link to="/admin-panel/logs"><i class="fa fa-list" aria-hidden="true"></i> Logs</router-link></li>
					<li><router-link to="/admin-panel/my-account"><i class="fa fa-user-circle" aria-hidden="true"></i> My Account</router-link></li>
				</ul>
			</div>
			<div class="main-wrapper">
				<complaints v-if="$route.params.target == 'complaints'"></complaints>
				<users v-if="$route.params.target == 'users'"></users>
				<my-account v-if="$route.params.target == 'my-account'"></my-account>
			</div>
		</div>

		<transition name="fade">
			<div class="modal-container" v-if="showMessageModal">
				<div class="table-cell">
					<div class="modal">
						{{ message }}
						<hr>
						<div class="lower">
							<button class="close" @click="showMessageModal = false">Close</button>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import Complaints from '../components/adminpanel/Complaints'
	import Users from '../components/adminpanel/Users'
	import MyAccount from '../components/adminpanel/MyAccount'
	import jwt from 'jsonwebtoken'
	import Cookie from 'js-cookie'
	import db from '../services/firebase'
	export default{
		data() {
			return{
				username: '',
				password: '',
				message: '',
				showMessageModal: false,
			}
		},
		components: {
			Complaints, Users, MyAccount
		},
		methods: {
			login() {
				let me = this
				me.$parent.isLoading = true
				db.collection('users')
				.where('idnumber', '==', me.username)
				.where('password', '==', me.password)
				.where('role', '==', 1)
				.get().then(res => {
					if(!res.empty) { // if matched
						let encoded = jwt.sign({
							user_id: res.docs[0].id
						}, process.env.VUE_APP_JWT_SECRET, { expiresIn: '24h' })
						Cookie.set('admin-token', encoded)
						me.$parent.isAdminLoggedIn = true
					}else{
						alert('Invalid credentials. Please try again.')
						Cookie.remove('admin-token')
						me.$parent.isAdminLoggedIn = false
					}
				}).catch(err => {
					console.log('Error: '+err)
				}).then(() => {
					me.$parent.isLoading = false
				})
			},
			clientLogout() {
                let me = this
                me.isLoading = true
                Cookie.remove('client-token')
                me.$parent.isLoading = false
                me.$parent.isClientLoggedIn = false
            }
		},
		mounted() {
			let me = this
			me.clientLogout()
		}
	}
</script>