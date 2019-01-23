<template>
	<div class="header">
		<span v-text="title"></span>
		<i class="cubeic-back" v-if="showBack" @click="back"></i>
		<div class="header-label">
			<slot name="label"></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			default: '',
			type: String
		},
		showBack: {
			default: true,
			type: Boolean
		}
	},
	data () {
		return {
			
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="less" scoped>
.header{
	z-index: 10;
	position: relative;
	font-size: 18px;
	width: 100%;
	height: 40px;
	line-height: 40px;
	background-color: #26A2FF;
	color: #fff;
  box-shadow: 0 2px 1px #e9eaea;
  span{
  	display: block;
		text-align: center;
  }
  .cubeic-back{
	  position: absolute;
	  top: 0;
	  left: 0;
	  padding: 0 15px;
	  color: #fff;
	}
	.header-label{
		position: absolute;
		top: 0;
		right: 15px;
		height: 40px;
		line-height: 40px;
	}
}
</style>