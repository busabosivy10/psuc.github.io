<template>
	<div class="home admin-panel">
		<div class="container" v-if="$parent.isClientLoggedIn || $parent.isAdminLoggedIn">
			<form @submit.prevent="submitComplaint()">
				<div class="form-group">
					<label>Your Alias (to be shown on "<router-link to="/complaints">View Complaints</router-link>" section)*</label>
					<input type="text" v-model="alias" name="alias" placeholder="anon623">
				</div>
				<div class="form-group">
					<label>What are you? *</label>
					<select v-model="way">
						<option value="none" style="display: none">Please select</option>
						<option>Student</option>
						<option>Staff</option>
						<option>Faculty</option>
						<option>Graduate</option>
					</select>
				</div>
				<div class="form-group">
					<label>What is this all about? *</label>
					<select v-model="about">
						<option value="none" style="display: none">Please select</option>
						<option>Complaint</option>
						<option>Compliment</option>
						<option>Suggestion</option>
					</select>
				</div>
				<div class="form-group">
					<label>What/Who is the subject of your concern? *</label>
					<select name="target" v-model="target">
						<option value="none" style="display: none">Please select</option>
						<option>Facilities</option>
						<option>Instructor</option>
						<option>System</option>
						<option>Portal</option>
					</select>
				</div>
				<div class="form-group">
					<label>Your Complaint *</label>
					<textarea rows="6" placeholder="Type your concern" v-model="message" name="message"></textarea>
				</div>
				<div class="buttons-container">
					<button type="submit">Submit</button>
					<button class="reset" type="button" @click="reset()">Reset Form</button>
				</div>
			</form>
		</div>
		<div v-if="$parent.isAdminLoggedIn == false">
			<div class="container login-container" v-if="$parent.isClientLoggedIn == false && authState == 1">
				<img src="/logo.png" class="logo">
				<p class="h3">User Login</p>
				<form @submit.prevent="clientLogin()">
					<div class="form-group">
						<input type="text" placeholder="Username (ID Number)" v-model="login.username" autofocus>
					</div>
					<div class="form-group">
						<input type="password" placeholder="Password" v-model="login.password">
					</div>
					<div class="form-group">
						<button type="submit">Login</button>
						<div class="not">
							Don't have an account? <a href="javascript:void()" @click="authState = 2">Click here to register</a>
						</div>
					</div>
				</form>
			</div>
			<div class="container login-container" v-if="$parent.isClientLoggedIn == false && authState == 2">
				<img src="/logo.png" class="logo">
				<p class="h3">Register</p>
				<form @submit.prevent="clientRegister()">
					<div class="form-group">
						<input type="text" placeholder="Your ID Number (to be verified by admin)" v-model="reg.idnumber" name="reg_idnumber" autofocus v-validate="'required'">
						<span class="validation-errors">{{ errors.first('reg_idnumber') }}</span>
					</div>
					<div class="form-group">
						<input type="text" placeholder="Fullname" v-model="reg.fullname" name="reg_fullname" v-validate="'required|alpha_spaces'">
						<span class="validation-errors">{{ errors.first('reg_fullname') }}</span>
					</div>
					<div class="form-group">
						<input type="text" placeholder="Email" v-model="reg.email" name="reg_email" v-validate="'required|email'">
						<span class="validation-errors">{{ errors.first('reg_email') }}</span>
					</div>
					<div class="form-group">
						<input type="password" placeholder="Password" v-model="reg.password" name="reg_password" v-validate="'required|min:8'" ref="reg_password">
						<span class="validation-errors">{{ errors.first('reg_password') }}</span>
					</div>
					<div class="form-group">
						<input type="password" placeholder="Confirm Password" v-model="reg.password2" name="reg_password2" v-validate="'required||confirmed:reg_password'">
						<span class="validation-errors">{{ errors.first('reg_password2') }}</span>
					</div>
					<div class="form-group">
						<button type="submit">Submit</button>
						<div class="not">
							Already have an account? <a href="javascript:void()" @click="authState = 1">Click here to login</a>
						</div>
					</div>
				</form>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import db from '../services/firebase'
	import $ from 'jquery'
	import jwt from 'jsonwebtoken'
	import Cookie from 'js-cookie'
	import moment from 'moment'
	import { Base64 } from 'js-base64'
	export default{
		data() {
			return{
				// data to submit
				way: 'none',
				about: 'none',
				target: 'none',
				message: '',
				ip: '',
				name: '',
				alias: '',

				// others
				authState: 1,

				// for login
				login: {
					username: '',
					password: ''
				},

				// for registration
				reg: {
					idnumber: '',
					username: '',
					fullname: '',
					email: '',
					password: '',
					password2: '',
				}
			}
		},
		methods: {
			clientLogin() {
				let me = this
				me.$parent.isLoading = true
				db.collection('users')
				.where('idnumber', '==', me.login.username)
				.where('password', '==', me.login.password)
				.where('approved', '==', true)
				.get().then(res => {
					if(!res.empty) { // if matched
						let encoded = jwt.sign({
							user_id: res.docs[0].id,
							real_name: res.docs[0].data().fullname
						}, process.env.VUE_APP_JWT_SECRET, { expiresIn: '24h' })
						Cookie.set('client-token', encoded)
						me.$parent.isClientLoggedIn = true

						jwt.verify(Cookie.get('client-token'), process.env.VUE_APP_JWT_SECRET, (err, decoded) => {
		                    me.$parent.decodedClientToken = decoded
			            })
					}else{
						alert('Invalid credentials or your account has not been approved by the administrator. Please try again.')
						Cookie.remove('client-token')
						me.$parent.isClientLoggedIn = false
					}
				}).catch(err => {
					console.log('Error: '+err)
				}).then(() => {
					me.$parent.isLoading = false
				})
			},
			clientRegister() {
				let me = this
				// validation here
				me.$validator.validate().then(res => {
					if(!res) { // do not proceed
						die()
					}else{
						// check if data exists
						me.$parent.isLoading = true
						db.collection('users')
						.where('idnumber', '==', me.reg.idnumber)
						.get().then(res => {
							if(!res.empty) { // if exists
								alert('Sorry. It seems like the ID Number you provided is already registered')
							}else{ // if doesnt exits
								db.collection('users').doc().set({
									idnumber: me.reg.idnumber,
									fullname: me.reg.fullname,
									email: me.reg.email,
									password: me.reg.password,
									role: 0,
									approved: false,
									created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
									updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
								}).then(() => {
									alert('Thank you for registering. The admin will approve your account within 24 hours.')
									me.reg.idnumber = ''
									me.reg.fullname = ''
									me.reg.email = ''
									me.reg.password = ''
									me.reg.password2 = ''
								}).catch(err => {
									console.log('Error: '+err)
								})
							}
						}).catch(err => { console.log('Error: '+error) })
						.then(() => {
							me.$parent.isLoading = false
						})

					}
				})
				// end
			},
			submitComplaint() {
				let me = this
				var errors = []
				// validate
				$.each($('.home').find('select'), function() {
					if($(this).find(':selected').val() == 'none') {
						$(this).addClass('has-errors')
						errors.push(1)
					}
				})
				if(me.message == '') {
					$('textarea[name="message"').addClass('has-errors')
					errors.push(1)
				}

				if(me.alias == '') {
					$('input[name="alias"').addClass('has-errors')
					errors.push(1)
				}

				// do not proceed if has errors
				if(errors.length > 0) {
					alert('Please fill-out all required fields')
					die()
				}

				me.setLoading(true)

				// saving here
				let userID = me.$parent.decodedClientToken.user_id
				let realName = me.$parent.decodedClientToken.real_name
				db.collection('complaints').doc().set({
					alias: me.alias,
					way: me.way,
					about: me.about,
					target: me.target,
					message: me.message,
					user_id: userID,
					showToPublic: false,
					real_name: realName,
					created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
					updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
				}).then(() => {
					console.log('Success')
					alert('Thank you for submitting your concern.')
				}).catch(err => {
					console.log('Error: '+err)
				}).then(() => {
					me.setLoading(false)
					me.reset()
				})
			},
			reset() {
				let me = this
				$('body select').removeClass('has-errors')
				$('body textarea').removeClass('has-errors')
				me.way = 'none'
				me.about = 'none'
				me.target = 'none'
				me.message = ''
				me.name = ''
				me.alias = ''
			},
			setLoading(val) {
				this.$parent.isLoading = val
			},
			adminLogout() {
                let me = this
                me.isLoading = true
                Cookie.remove('admin-token')
                me.$parent.isLoading = false
                me.$parent.isAdminLoggedIn = false
            }
		},
		mounted() {
			let me = this
		}
	}

	$('body').on('change', 'select', function() {
		$(this).removeClass('has-errors')
	})
	$('body').on('change', 'input', function() {
		$(this).removeClass('has-errors')
	})
	$('body').on('change', 'textarea', function() {
		$(this).removeClass('has-errors')
	})
</script>