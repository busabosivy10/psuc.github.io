<template>
	<div class="my-account">
		<h2>Account Settings</h2>
		<h3 class="success" v-if="success">Success<br></h3>
		<form @submit.prevent="submit()">
			<div class="form-group">
				<label>Enter Old Password</label>
				<input type="password" name="old_password" v-model="old_password" v-validate="'required'">
				<span class="validation-errors">{{ errors.first('old_password') }}</span>
			</div>
			<div class="form-group">
				<label>Enter New Password</label>
				<input type="password" name="new_password" v-model="new_password" v-validate="'required|min:8'" ref="new_password">
				<span class="validation-errors">{{ errors.first('new_password') }}</span>
			</div>
			<div class="form-group">
				<label>Confirm New Password</label>
				<input type="password" name="new_password2" v-model="new_password2" v-validate="'required|confirmed:new_password'">
				<span class="validation-errors">{{ errors.first('new_password2') }}</span>
			</div>
			<div class="form-group">
				<button>Save Changes</button>
			</div>
		</form>
	</div>
</template>

<script>
	import db from '../../services/firebase'
	export default {
		data() {
			return {
				old_password: '',
				new_password: '',
				new_password2: '',
				success: false,
			}
		},
		methods: {
			submit() {
				let me = this
				me.$validator.validate().then(res => {
					if(!res) { // do not proceed
						die()
					}else{
						me.$parent.$parent.isLoading = 1
						db.collection('users')
						.where('idnumber', '==', 'superadmin')
						.where('password', '==', me.old_password)
						.get()
						.then(res => {
							if(!res.empty) { // pag may match
								db.collection('users').doc('rLf1e6jichSzsL8vEMKn').update({
									password: me.new_password
								}).then(res => {
									console.log(res)
									me.success = true
								}).catch(err => {
									console.log(err)
								}).then(() => {
									me.$parent.$parent.isLoading = 0
								})
							}else{
								alert('The old password you entered is invalid')
								me.$parent.$parent.isLoading = 0
							}
						})
					}
				})
			}
		}
	}
</script>