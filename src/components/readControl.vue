<template>
	<div class="read-control" :style="{visibility: show ? 'visible' : 'hidden'}">
		<div class="control-header" :style="{transform: show ? 'translateY(0)' : 'translateY(-100%)', opacity: show ? 1 : 0}">
			<span v-text="title"></span>
			<i class="cubeic-back" @click="back">返回</i>
		</div>
		<div class="control-footer" :style="{transform: show ? 'translateY(0)' : 'translateY(100%)', opacity: show ? 1 : 0}">
			<div class="control-footer-themes" @click.stop>
				<cube-checker v-model="checkerSelect" :options="checkerOptions" type="radio"/>
			</div>
			<div class="control-footer-chapter">
				<span @click="toNearChapter('last')">上一章</span>
				<span @click.stop="showMenu">目录</span>
				<span @click="toNearChapter('next')">下一章</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			title: this.$parent.bookName,
			checkerSelect: 'default',
			checkerOptions: [
				{value: 'default', text: '默认'},
				{value: 'dark', text: '夜间'},
				{value: 'protect', text: '护眼'}
			],
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		showMenu () {
			this.$emit('showMenu', '')
		},
		toNearChapter (val) {
			this.$emit('toNearChapter', val)
		}
	},
	watch: {
		checkerSelect: function (val) {
			console.log(val)
			this.$emit('themesChange', val)
		}
	}
}
</script>

<style lang="less" scoped>
.read-control{
	position: fixed;
	width: 100%;
	height: 100%;
}
.control-header{
	z-index: 10;
	position: fixed;
	top: 0;
	left: 0;
	font-size: 14px;
	width: 100%;
	height: 40px;
	line-height: 40px;
	background-color: rgba(50,51,52,.9);
	color: #fff;
	transition: all .2s;
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
}
.control-footer{
	z-index: 10;
	position: fixed;
	bottom: 0;
	font-size: 14px;
	width: 335px;
	background-color: rgba(50,51,52,.9);
	color: #fff;
	padding: 20px;
	transition: all .2s;
}
.control-footer-chapter{
	padding-top: 30px;
	display: flex;
	text-align: center;
	span{
		flex: 1;
		&:first-child{
			text-align: left;
		}
		&:last-child{
			text-align: right;
		}
	}
}
</style>
<style scoped>
.control-footer-themes >>> .cube-checker{
	display: flex;
}
.control-footer-themes >>> .cube-checker-item{
	background: transparent;
	color: #fff;
	flex: 0 0 79px;
	margin-right: 19px;
}
.control-footer-themes >>> .cube-checker-item:after{
	border: 1PX solid #535353;
}
.control-footer-themes >>> .cube-checker-item_active{
	color: #8ECDFC;
}
.control-footer-themes >>> .cube-checker-item_active:after{
  border: 1PX solid #8ECDFC;
}
</style>