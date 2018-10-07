<template>
	<div class="post-template">
		<div class="col left">
			<div class="info-group">
				<p class="label">Posted by:</p>
				<p class="value">{{ data.alias }}</p>
			</div>
			<div class="info-group">
				<p class="label">Status:</p>
				<p class="value">{{ data.way }}</p>
			</div>
			<div class="info-group">
				<p class="label">Subject:</p>
				<p class="value">{{ data.about }}</p>
			</div>
			<div class="info-group">
				<p class="label">About:</p>
				<p class="value">{{ data.target }}</p>
			</div>
			<div class="info-group">
				<p class="label">Date Submitted:</p>
				<p class="value">{{ data.created_at | moment("MMM DD, YYYY | hh:mm a") }}</p>
			</div>
		</div>
		<div class="col right">
			<div class="info-group">
				<p class="value">{{ data.message }}</p>
			</div>
		</div>
		<button class="delete" @click="confirmDelete(data['.key'])" v-if="data.user_id == $parent.$parent.decodedClientToken.user_id"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
	</div>
</template>

<script>
	import db from '../services/firebase'
	export default{
		props: ['data'],
		methods: {
			confirmDelete(id) {
				let me = this
				var deleteme = confirm('Are you sure you want to delete this post?')
				if(deleteme) {
					me.$parent.$parent.isLoading = 1
					db.collection('complaints').doc(id).delete().then(() => {
						console.log('Deleted successfully')
					}).catch(err => {
						console.log(err)
					}).then(() => {
						me.$parent.$parent.isLoading = 0
					})
				}
			}
		}
	}
</script>