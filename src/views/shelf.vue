<template>
	<div v-title="header.title">
		<m-header :title="header.title">
			<!--<a slot="label">123</a>-->
		</m-header>
		<div :style="{height: scrollHeight}" @click="a">
			<cube-scroll>
				<div v-for="item in 100">{{item}}</div>
			</cube-scroll>
		</div>
		<m-footer></m-footer>
	</div>
</template>

<script>
import mHeader from '@/components/header'
import mFooter from '@/components/footer'
export default {
	components: {
		mHeader,
		mFooter
	},
	data () {
		return {
			header: {
				title: '书架'
			}
		}
	},
	computed: {
		scrollHeight: function () {
			return (document.body.clientHeight - 40-50)+'px'
		}
	},
	methods: {
		a () {
			this.$createDialog({
        type: 'alert',
        title: '我是标题',
        content: '我是内容',
        icon: ''
      }).show()
		}
	}
}
</script>

<style scoped>

</style>