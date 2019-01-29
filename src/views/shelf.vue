<template>
	<div v-title="header.title">
		<m-header :title="header.title">
			<!--<a slot="label">123</a>-->
		</m-header>
		<div class="shelf" :style="{height: scrollHeight}">
			<div class="shelf-main"  v-if="hasBook">
				<cube-scroll>
					<cube-swipe>
					<router-link :to="{path: 'read', query: {id: item.item.id, name: item.item.name}}" tag="div" class="shelf-item" v-for="(item, index) in bookData" :key="index">
						<cube-swipe-item :btns="item.btns" :index="index" ref="swipeItem" @btn-click="btnClick">
							<div class="shelf-item-img">
								<img :src="item.item.img" />
							</div>
							<div class="shelf-item-content">
								<p>
									<span v-text="item.item.name"></span>
									<span class="shelf-tag" v-text="item.item.time"></span>
								</p>
								<p v-text="item.item.author+' 著'"></p>
								<p v-text="'连载至： '+item.item.lastChapter"></p>
							</div>
						</cube-swipe-item>
					</router-link>
					</cube-swipe>
				</cube-scroll>
			</div>
			<div class="shelf-no" v-else>
				<img src="../assets/cry.png" />
				<p>书架空空如也</p>
			</div>
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
			},
			bookData: [],
			hasBook: false
		}
	},
	computed: {
		scrollHeight: function () {
			return (document.body.clientHeight - 24.53333*document.body.clientWidth/100)+'px'
		}
	},
	methods: {
		getData () {
			if (window.localStorage.getItem('xiaoshuo_shelf')) {
				let _arr = JSON.parse(window.localStorage.getItem('xiaoshuo_shelf'))
				let _ids = []
				_arr.map((item)=>{
					_ids.push(item.id)
				})
				this.$axios.get('/book', {params: {
					view: 'updated',
					id: _ids.toString()
				}}).then((res)=>{
					if (res.data && res.data.length > 0) {
						let _bookData = []
						for (let i=0; i<res.data.length; i++) {
							_bookData.push({
								item: {
									id: res.data[i]._id,
									img: _arr[i].img,
									name: _arr[i].name,
									author: res.data[i].author,
									lastChapter: res.data[i].lastChapter,
									time: this.formatUpdatedTime(res.data[i].updated, '前')
								},
								btns: [
									{
			              action: 'delete',
			              text: '删除',
			              color: '#ff3a32'
			            }
								]
							})
						}
						this.bookData = _bookData
						this.hasBook = true
					}
				})
			}
		},
		btnClick (btn, index) {
			if (btn.action === 'delete') {
				this.$refs.swipeItem[index].shrink()
				this.$createDialog({
	        type: 'confirm',
	        title: '温馨提示',
	        content: '确定要从书架中删除？',
	        onConfirm: () => {
	        	let _arr = JSON.parse(window.localStorage.getItem('xiaoshuo_shelf'))
	        	for (let i=0; i<_arr.length; i++) {
	        		if (_arr[i].id === this.bookData[index].item.id) {
	        			_arr.splice(i, 1)
	        			if (_arr.length > 0) {
	        				window.localStorage.setItem('xiaoshuo_shelf', JSON.stringify(_arr))
	        			} else {
	        				window.localStorage.removeItem('xiaoshuo_shelf')
	        				this.hasBook = false
	        			}
	        			this.bookData.splice(index, 1)
	        		}
	        	}
	        }
	      }).show()
			}
		},
		formatUpdatedTime (time, otherText) {
			let _timestamp = new Date()-new Date(time)
			if (_timestamp/1000 < 60) {
				return (_timestamp/1000).toFixed(0)+'秒'+otherText
			}
			if (_timestamp/1000/60 < 60) {
				return (_timestamp/1000/60).toFixed(0)+'分钟'+otherText
			}
			if (_timestamp/1000/60/60 < 24) {
				return (_timestamp/1000/60/60).toFixed(0)+'小时'+otherText
			}
			return (_timestamp/1000/60/60/24).toFixed(0)+'天'+otherText
		},
	},
	created () {
		this.getData()
	}
}
</script>

<style lang="less" scoped>
.shelf{
	overflow: scroll;
}
.shelf-main{
	background-color: #fff;
}
.shelf-item{
	margin: 20px 0;
	position: relative;
	&:after{
		content: '';
		width: 100%;
		position: absolute;
		bottom: -10px;
		left: 20px;
		border-bottom: 1px dashed #f0f0f0;
	}
}
.shelf-item-img{
	width: 58px;
	height: 78px;
	display: inline-block;
	vertical-align: middle;
	margin-left: 20px;
	img{
		width: 100%;
		height: 100%;
	}
}
.shelf-item-content{
	display: inline-block;
	vertical-align: middle;
	width: 262px;
	margin-left: 15px;
	line-height: 1.5;
	p{
		color: #666;
		font-size: 12px;
	}
	p:first-child{
		color: #333;
		font-weight: 700;
		font-size: 14px;
	}
	p:first-child span:first-child{
		display: inline-block;
		vertical-align: middle;
	}
	.shelf-tag{
		display: inline-block;
		vertical-align: middle;
		padding: 1px 4px;
		margin-left: 5px;
		border-radius: 10px;
		border: 1px solid #26A2FF;
		font-size: 10px;
		color: #26A2FF;
	}
}
.shelf-no{
	padding: 180px 0;
	text-align: center;
	img{
		width: 100px;
	}
	p{
		font-size: 16px;
		margin-top: 20px;
	}
}
</style>