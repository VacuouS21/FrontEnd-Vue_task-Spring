<template>
	<div class="loader"></div>
</template>

<script>
	import { mapActions } from 'vuex';
  import { wait } from '../utils';

	export default {
		mounted() {
			this.$nextTick(async () => {
				await this.initialize();
        await this.initializeUser();
        await wait(1500);
				await this.$router.push({name: "List"});
			});
		},
		methods: {
			...mapActions([
				'initialize',
          'initializeUser'
			])
		}
	}
</script>


