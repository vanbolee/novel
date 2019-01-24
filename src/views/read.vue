<template>
	<div class="read" v-title="header.title">
		<ul>
			<li v-for="(item, index) in bookContent" :key="index">
				<div class="read-title" v-text="item.title"></div>
				<p class="read-p" v-for="(items, index) in item.content" v-text="items"></p>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data () {
		return {
			header: {
				title: '阅读'
			},
			bookId: this.$route.query.id,
			readId: '',
			menu: [],
			bookContent: [],
			source: {
				sourceIndex: 0, //数据源index
				menuIndex: 1, //目录index
				sourceData: [] //数据源
			}
		}
	},
	methods: {
		getReadId () {
			this.$axios.get('/atoc', {params: {
				view: 'summary',
				book: this.bookId
			}}).then((res)=>{
				this.source.sourceData = res.data
				this.readId = res.data[this.source.sourceIndex]._id
				this.getMenu()
			})
		},
		getMenu () {
			this.$axios.get('/atoc/'+this.readId+'?view=chapters&channel=mweb&platform=h5', {}).then((res)=>{
				this.menu = res.data.chapters
				this.getChapter()
			})
		},
		getChapter () {
			this.$axios.get('/chapter/'+this.menu[this.source.menuIndex-1].link, {}).then((res)=>{
				let _content = res.data.chapter.cpContent ? res.data.chapter.cpContent : res.data.chapter.body
				_content = _content.replace(/((\r+)?\n)+/g, ' ').split(/\s+/g)
				this.bookContent.push({
					title: res.data.chapter.title,
					content: _content
				})
			})
		}
	},
	created () {
		this.getReadId()
	}
}
</script>

<style lang="less" scoped>
.read{
	background-color: #eee6dd;
	height: 100vh;
	overflow: scroll;
}
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
  color: #5c5d58;
}
</style>