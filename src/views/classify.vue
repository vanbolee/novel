<template>
	<div v-title="header.title">
		<m-header :title="header.title">
			<!--<a slot="label">123</a>-->
		</m-header>
		<div class="classify" :style="{height: scrollHeight}">
			<cube-scroll>
				<div class="classify-item" v-for="(item, index) in classify" :key="index">
					<p class="classify-item-title" v-text="item.value"></p>
					<div class="classify-item-children">
						<div class="classify-item-childrenItem" v-for="(items, index) in item.children" :key="index" @click="toCategory(item.key, items.name)">
							<p v-text="items.name"></p>
							<span v-text="items.bookCount"></span>
						</div>
					</div>
				</div>
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
				title: '分类'
			},
			classify: [
				{value: '男生', key: 'male', children: []},
				{value: '女生', key: 'female', children: []},
				{value: '漫画', key: 'picture', children: []},
				{value: '出版', key: 'press', children: []}
			]
		}
	},
	computed: {
		scrollHeight: function () {
			return (document.body.clientHeight - 24.53333*document.body.clientWidth/100)+'px'
		}
	},
	methods: {
		getData () {
			this.$axios.get("/cats/lv2/statistics",{}).then(res=>{
				for (let i=0; i<this.classify.length; i++) {
					let _parent = this.classify[i]
					_parent.children = res.data[_parent.key]
				}
			})
		},
		toCategory (gender, name) {
			this.$router.push({path: 'category', query: {gender: gender, name: name}})
		}
	},
	created () {
		this.getData()
	}
}
</script>

<style scoped>
.classify{
	background-color: #fff;
}
.classify-item-children{
	box-sizing: border-box;
	position: relative;
	border-left: 1px solid #f5f5f5;
	border-top: 1px solid #f5f5f5;
}
.classify-item-title{
	padding: 20px 10px;
	font-size: 12px;
	color: #999;
}
.classify-item-childrenItem{
	box-sizing: border-box;
	display: inline-block;
	width: 33.3333%;
	padding: 20px 0;
	text-align: center;
	position: relative;
	border-right: 1px solid #f5f5f5;
	border-bottom: 1px solid #f5f5f5;
}
.classify-item-childrenItem p{
	font-size: 16px;
	font-weight: 700;
	color: #333;
	margin-bottom: 5px;
}
.classify-item-childrenItem span{
	font-size: 12px;
	color: #ccc;
}
</style>