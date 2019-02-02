<template>
	<div class="read-control" :style="{visibility: show ? 'visible' : 'hidden'}">
		<div class="control-header" :style="{transform: show ? 'translateY(0)' : 'translateY(-100%)', opacity: show ? 1 : 0}">
			<span v-text="title"></span>
			<i class="cubeic-back" @click="back">返回</i>
			<i class="iconfont icon-menu" @click.stop="menu"></i>
			<div class="control-menu" v-show="isMenuShow">
				<router-link :to="{path: 'feature'}" tag="p">
					<i class="iconfont icon-jingxuan"></i>
					<span>精选</span>
				</router-link>
				<router-link :to="{path: '/'}" tag="p">
					<i class="iconfont icon-book"></i>
					<span>书架</span>
				</router-link>
				<p @click="changeSource">
					<i class="iconfont icon-tihuan"></i>
					<span>换源</span>
				</p>
			</div>
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
			isMenuShow: false
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		menu () {
			this.isMenuShow = !this.isMenuShow
		},
		changeSource () {
			this.$emit('changeSource', '')
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
	.icon-menu{
		position: absolute;
	  top: 0;
	  right: 0;
	  padding: 0 15px;
	  color: #fff;
	}
	.control-menu{
		position: absolute;
		right: 10px;
		top: 50px;
		width: 100px;
		text-align: center;
		border-radius: 5px;
		background-color: rgba(50,51,52,.9);
		font-size: 12px;
		line-height: 2.5;
		p{
			border-bottom: 1px solid rgba(0,0,0,.2);
			&:last-child{
				border-bottom: none;
			}
		}
		i{
			font-size: 12px;
		}
		span{
			display: inline;
			margin-left: 5px;
		}
		&:before{
			content: '';
			position: absolute;
			right: 0;
			top: -7px;
			right: 7.5px;
			width: 0;
			height: 0;
			border-style: solid;
	    border-color: transparent transparent rgba(50,51,52,.9);
	    border-width: 0 6px 8px;
		}
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