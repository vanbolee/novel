<template>
	<ul>
		<li v-for="(item, index) in data" :key="index">
			<div class="read-title" :style="{color: themes[themes.type].color.title}" v-text="item.title"></div>
			<p class="read-p" :style="{color: themes[themes.type].color.content}" v-for="(items, index) in item.content" v-text="items"></p>
		</li>
		<div class="read-loading" :style="{visibility: showLoading ? 'visible' : 'hidden'}">加载中。。。</div>
	</ul>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			default: []
		},
		showLoading: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			themes: this.$parent.themes
		}
	}
}
</script>

<style scoped>
.read-title{
	font-size: 22px;
	line-height: 1.5;
	padding: 20px;
}
.read-p{
  text-indent: 2em;
  font-size: 18px;
  line-height: 1.5;
  padding: 5px 20px;
  word-break: break-all;
}
.read-loading{
	padding: 20px;
	text-align: center;
	color: #8ECDFC;
	font-size: 12px;
}
</style>