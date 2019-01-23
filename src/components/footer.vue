<template>
	<div class="footer">
		<cube-tab-bar
	    v-model="selectedLabelSlots"
	    @click="clickHandler">
	    <cube-tab v-for="(item, index) in tabs" :label="item.label" :value="item.value" :key="item.index">
	      <!-- name为icon的插槽 -->
	      <i slot="icon" class="iconfont footer-icon" :class="item.icon"></i>
	      <!-- 默认插槽 -->
	      <p class="footer-text">{{item.label}}</p>
	    </cube-tab>
	  </cube-tab-bar>
	</div>
</template>

<script>
export default {
	data () {
		return {
			selectedLabelSlots: '/',
			tabs: [
				{label: '书架', value: '/', icon: 'icon-book'},
				{label: '分类', value: '/classify', icon: 'icon-fenlei'},
				{label: '排行', value: '/ranking', icon: 'icon-paihangbang-'},
				{label: '搜索', value: '/search', icon: 'icon-sousuo'},
			]
		}
	},
	methods: {
		clickHandler (value) {
			this.$router.push(value)
		}
	},
	created () {
		this.selectedLabelSlots = this.$route.path
	}
}
</script>

<style>
.footer{
	width: 100%;
	position: absolute;
	bottom: 0;
	z-index: 10;
	background-color: #fff;
	box-shadow: 0 -2px 1px #e9eaea;
}
.footer-text{
	font-size: 14px;
	margin-top: 5px;
}
.footer-icon{
	font-size: 18px;
}
</style>