<template>
	<div v-title="header.title">
		<m-header :title="header.title">
			<div slot="label" class="ranking-sex-select">
				<span :class="{'ranking-sex-selected': item.isSelect}" v-for="(item, index) in sex" :key="index" v-text="item.value" @click="toSelectSex(index)"></span>
			</div>
		</m-header>
		<div class="ranking">
			<div class="ranking-left" :style="{height: scrollHeight}" ref="rankingMenu">
				<div class="ranking-left-item" :class="{'ranking-left-item-selected': item.isSelect}" v-for="(item, index) in rankingData[selectSex]" :key="index" v-text="item.name" @click="toSelectRanking(index)"></div>
			</div>
			<div class="ranking-right" :style="{height: scrollHeight}">
				<router-link :to="{path: 'book', query: {id: item.id}}" tag="div" class="ranking-right-item" v-for="item in rankingData.childData">
					<div class="ranking-right-item-img">
						<img :src="item.img"/>
					</div>
					<div class="ranking-right-item-main">
						<p class="ranking-right-item-name" v-text="item.name"></p>
						<p class="ranking-right-item-author" v-text="item.author"></p>
						<p class="ranking-right-item-intro" v-text="item.intro"></p>
						<p class="ranking-right-item-more">
							<span style="color: #ed424b;" v-text="item.retentionRatio+'%留存'"></span>
							<span v-html="'&nbsp;&nbsp;|&nbsp;&nbsp;'"></span>
							<span style="color: #4284ed;" v-text="item.latelyFollower+'人气'"></span>
						</p>
					</div>
				</router-link>
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
				title: '排行'
			},
			sex: [
				{value: '男', key: 'male', isSelect: true},
				{value: '女', key: 'female', isSelect: false}
			],
			selectSex: 'male',
			rankingData: {
				male: [],
				female: [],
				childData: []
			}
		}
	},
	computed: {
		scrollHeight: function () {
			return (document.body.clientHeight - 24.53333*document.body.clientWidth/100)+'px'
		}
	},
	methods: {
		getData () {
			this.$axios.get('/ranking/gender', {}).then((res)=>{
				for (let i=0; i<res.data.male.length; i++) {
					this.rankingData.male.push({
						id: res.data.male[i]._id,
						name: res.data.male[i].shortTitle,
						isSelect: false
					})
				}
				for (let i=0; i<res.data.female.length; i++) {
					this.rankingData.female.push({
						id: res.data.female[i]._id,
						name: res.data.female[i].shortTitle,
						isSelect: false
					})
				}
				this.rankingData.male[0].isSelect = true
				this.rankingData.female[0].isSelect = true
				this.getChild(this.rankingData.male[0].id)
			})
		},
		getChild (id) {
			this.rankingData.childData = []
			this.$axios.get('/ranking/'+id, {}).then((res)=>{
				for (let i=0; i<res.data.ranking.books.length; i++) {
					this.rankingData.childData.push({
						id: res.data.ranking.books[i]._id,
						author: res.data.ranking.books[i].author,
						name: res.data.ranking.books[i].title,
						img: 'https://statics.zhuishushenqi.com'+res.data.ranking.books[i].cover,
						intro: res.data.ranking.books[i].shortIntro,
						retentionRatio: res.data.ranking.books[i].retentionRatio,
						latelyFollower: this.formatPeople(res.data.ranking.books[i].latelyFollower)
					})
				}
			})
		},
		toSelectSex (index) {
			for (let i in this.sex) {
				this.sex[i].isSelect = false
			}
			this.sex[index].isSelect = true
			this.selectSex = this.sex[index].key
			this.toSelectRanking(0)
			this.$refs.rankingMenu.scrollTop = 0
		},
		toSelectRanking (index) {
			for (let i in this.rankingData[this.selectSex]) {
				this.rankingData[this.selectSex][i].isSelect = false
			}
			this.rankingData[this.selectSex][index].isSelect = true
			this.getChild(this.rankingData[this.selectSex][index].id)
		},
		formatPeople (nums){
			if (nums > 9999) {
				return parseFloat((nums/10000).toFixed(1))+'万'
			} else {
				return nums
			}
		}
	},
	created () {
		this.getData()
	}
}
</script>

<style scoped>
.ranking-sex-select span{
	display: inline-block;
	vertical-align: middle;
	padding: 0 15px;
	border: 1px solid #f0f0f0;
  line-height: 22px;
  height: 22px;
  margin-left: -1px;
  font-size: 14px;
}
.ranking-sex-select span:first-child{
	border-radius: 5px 0 0 5px;
}
.ranking-sex-select span:last-child{
	border-radius: 0 5px 5px 0;
}
.ranking-sex-selected{
	background-color: #fff;
	color: #26A2FF;
}
.ranking-left{
	overflow-y: scroll;
	display: inline-block;
	vertical-align: top;
	width: 80px;
	background-color: #f6f7f9;
}
.ranking-left-item{
	text-align: center;
	padding: 15px 0;
	font-size: 14px;
}
.ranking-left-item-selected{
	border-left: 2px solid #8ECDFC;
	background-color: #fff;
}
.ranking-right{
	overflow-y: scroll;
	display: inline-block;
	vertical-align: top;
	width: 295px;
	background-color: #fff;
}
.ranking-right-item{
	padding: 10px;
}
.ranking-right-item-img{
	display: inline-block;
	vertical-align: middle;
	width: 66px;
	height: 88px;
}
.ranking-right-item-img img{
	width: 100%;
	height: 100%;
}
.ranking-right-item-main{
	display: inline-block;
	vertical-align: middle;
	width: 200px;
	margin-left: 9px;
	font-size: 12px;
	color: #969ba3;
}
.ranking-right-item-name{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 14px;
	font-weight: 700;
	margin-bottom: 8px;
	padding-top: 6px;
	color: #333;
}
.ranking-right-item-author{
	margin-bottom: 8px;
}
.ranking-right-item-intro{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-bottom: 6px;
}
</style>