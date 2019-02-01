<template>
	<div class="read" ref="read" :style="{backgroundColor: themes[themes.type].bgColor}" v-title="header.title" @click="showControl = !showControl">
		<read-content :data="bookContent" :show-loading="scrollToNext"></read-content>
		<read-control :show="showControl" @themesChange="themesChange" @showMenu="showMenu" @toNearChapter="toNearChapter"></read-control>
		<read-menu ref="menu" :data="menu" @menu-change="menuChange" @change-chapter-index="changeMenuIndex"></read-menu>
	</div>
</template>

<script>
import readContent from '@/components/readContent'
import readControl from '@/components/readControl'
import readMenu from '@/components/readMenu'
export default {
	components: {
		readContent,
		readControl,
		readMenu
	},
	data () {
		return {
			header: {
				title: '阅读'
			},
			bookId: this.$route.query.id,
			bookName: this.$route.query.name,
			readId: '',
			menu: [],
			bookContent: [],
			source: {
				sourceIndex: 0, //数据源index
				menuIndex: 1, //目录index
				sourceData: [] //数据源
			},
			scrollToNext: false, //滚动加载下一章开关
			showControl: false,
			themes: { //主题
				type: 'default',
				default: {
					bgColor: '#eee6dd',
					color: {
						title: '#333',
						content: '#5c5d58'
					}
				},
				dark: {
					bgColor: '#0c0c0c',
					color: {
						title: '#888',
						content: '#666'
					}
				},
				protect: {
					bgColor: '#b8cd8d',
					color: {
						title: '#0c2e10',
						content: '#3d5840'
					}
				}
			},
			top: 0
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
				document.title = this.bookName+'_'+res.data.chapter.title
				this.scrollToNext = false
			})
		},
		changeMenuIndex (index) {
			this.menuChange('hide')
			this.source.menuIndex = index+1
			this.bookContent = []
			this.getChapter()
		},
		scroll () {
			let _dom = this.$refs.read
			if (_dom.scrollTop+_dom.clientHeight+10 >= _dom.scrollHeight) {
				if (this.source.menuIndex === this.menu.length) {
					return
				}
				this.scrollToNext = true
			}
		},
		themesChange (val) {
			this.themes.type = val
		},
		menuChange (type) {
			if (type === 'show') {
				this.$refs.menu.show()
			} else {
				this.$refs.menu.hide()
			}
		},
		showMenu () {
			this.showControl = false
			this.menuChange('show')
		},
		toNearChapter (val) {
			if (val === 'last') {
				if (this.source.menuIndex === 1) {
					this.$createToast({
		        txt: '已经是第一章',
		        type: 'txt',
		        time: 1000
		      }).show()
					return
				}
				this.source.menuIndex-=1
			} else {
				if (this.source.menuIndex === this.menu.length) {
					this.$createToast({
		        txt: '已经是最后一章',
		        type: 'txt',
		        time: 1000
		      }).show()
					return
				}
				this.source.menuIndex+=1
			}
			this.bookContent = []
			this.getChapter()
		}
	},
	created () {
		this.getReadId()
	},
	mounted () {
		this.$nextTick(()=>{
			setTimeout(()=>{
				this.$refs.read.addEventListener('scroll', this.scroll)
			}, 1000)
		})
	},
	watch: {
		scrollToNext: function (val) {
			if (val) {
				this.source.menuIndex+=1
				this.getChapter()
			}
		}
	},
	beforeDestroy () {
		this.$refs.read.removeEventListener('scroll', this.scroll)
	}
}
</script>

<style lang="less" scoped>
.read{
	height: 100vh;
	overflow: scroll;
}
</style>