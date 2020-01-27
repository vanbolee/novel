<template>
  <div v-title="header.title">
    <m-header :title="header.title">
      <!--<a slot="label">123</a>-->
    </m-header>
    <div class="category-filter">
      <div class="category-filter-item">
        <cube-checker
          v-model="checkerType"
          :options="checkerTypeOptions"
          type="radio"
        />
      </div>
      <div class="category-filter-item">
        <cube-checker
          v-model="checkerClassifyChild"
          :options="checkerClassifyChildOptions"
          type="radio"
        />
      </div>
    </div>
    <div class="category" :style="{ height: scrollHeight }">
      <cube-scroll :options="options" @pulling-up="onPullingUp" ref="scroll">
        <router-link
          :to="{ path: 'book', query: { id: item._id } }"
          class="category-book-item border-bottom-1px"
          v-for="(item, index) in bookData"
          :key="index"
          tag="div"
        >
          <div class="category-book-itemImg">
            <img
              v-lazy="$store.state.imgHeader + item.cover"
              :key="item.cover"
            />
          </div>
          <div class="category-book-itemMain">
            <p class="category-book-itemMain-title" v-text="item.title"></p>
            <p
              class="category-book-itemMain-author"
              v-html="
                item.author + '&nbsp;&nbsp;|&nbsp;&nbsp;' + item.majorCate
              "
            ></p>
            <p
              class="category-book-itemMain-intro"
              v-text="item.shortIntro.replace(/\s+/g, '')"
            ></p>
            <p class="category-book-itemMain-important">
              <span
                class="red"
                v-text="formatPeople(item.latelyFollower)"
              ></span>
              <span>人&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <span class="red" v-text="(item.retentionRatio || 0) + '%'"></span>
              <span>读者留存</span>
            </p>
          </div>
        </router-link>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import mHeader from "@/components/header";
export default {
  components: {
    mHeader
  },
  data() {
    return {
      header: {
        title: this.$route.query.name
      },
      checkerType: "hot",
      checkerTypeOptions: [
        { value: "hot", text: "热门" },
        { value: "new", text: "新书" },
        { value: "reputation", text: "好评" },
        { value: "over", text: "完结" },
        { value: "monthly", text: "包月" }
      ],
      checkerClassifyChild: "all",
      checkerClassifyChildOptions: [{ value: "all", text: "全部" }],
      bookData: []
    };
  },
  computed: {
    scrollHeight() {
      return (
        document.body.clientHeight -
        (34.13333 * document.body.clientWidth) / 100 +
        "px"
      );
    },
    options() {
      return {
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: "上拉加载更多",
            noMore: "没有更多数据"
          }
        }
      };
    }
  },
  methods: {
    getData(type) {
      this.$axios
        .get("/book/by-categories", {
          params: {
            gender: this.$route.query.gender,
            type: this.checkerType,
            major: this.$route.query.name,
            minor:
              this.checkerClassifyChild === "all"
                ? ""
                : this.checkerClassifyChild,
            start: this.bookData.length,
            limit: 10
          }
        })
        .then(res => {
          for (let i = 0; i < res.data.books.length; i++) {
            this.bookData.push(res.data.books[i]);
          }
          if (type === "more") {
            if (res.data.books.length > 0) {
              this.$nextTick(() => {
                this.$refs.scroll.forceUpdate(true);
              });
            } else {
              this.$refs.scroll.forceUpdate();
            }
          }
        });
    },
    getClassifyChild() {
      this.$axios.get("/cats/lv2", {}).then(res => {
        for (let i = 0; i < res.data[this.$route.query.gender].length; i++) {
          if (
            res.data[this.$route.query.gender][i].major ===
            this.$route.query.name
          ) {
            for (
              let j = 0;
              j < res.data[this.$route.query.gender][i].mins.length;
              j++
            ) {
              this.checkerClassifyChildOptions.push({
                value: res.data[this.$route.query.gender][i].mins[j],
                text: res.data[this.$route.query.gender][i].mins[j]
              });
            }
            break;
          }
        }
      });
    },
    onPullingUp() {
      this.getData("more");
    },
    formatPeople(nums) {
      if (nums > 9999) {
        return parseFloat((nums / 10000).toFixed(1)) + "万";
      } else {
        return nums;
      }
    }
  },
  created() {
    this.getData();
    this.getClassifyChild();
  },
  watch: {
    checkerType: function(val) {
      if (val) {
        this.bookData = [];
        this.getData();
      }
    },
    checkerClassifyChild: function(val) {
      if (val) {
        this.bookData = [];
        this.getData();
      }
    }
  }
};
</script>

<style scoped>
.category >>> .before-trigger {
  font-size: 14px;
}
.category-filter-item {
  white-space: nowrap;
  overflow-x: scroll;
  border-bottom: 1px solid #f0f0f0;
}
.category-filter-item >>> .cube-checker {
  padding-left: 10px;
}
.category-filter-item >>> .cube-checker-item {
  font-size: 14px;
  padding: 15px 10px;
  color: #999;
}
.category-filter-item >>> .cube-checker-item_active {
  color: #93d0ff;
}
.category-filter-item >>> .cube-checker-item:after {
  content: none;
}
.category-filter-item,
.category-filter-item >>> .cube-checker-item {
  background-color: #fff;
}
.category-book-item {
  background-color: #fff;
  position: relative;
  padding: 15px;
}
.category-book-item:after {
  left: 15px !important;
  border-bottom: 1px solid #ccc !important;
}
.category-book-itemImg {
  width: 60px;
  height: 75px;
  display: inline-block;
  vertical-align: middle;
  background-color: #fffafa;
}
.category-book-itemImg img {
  width: 100%;
  height: 100%;
}
.category-book-itemMain {
  display: inline-block;
  vertical-align: middle;
  margin-left: 15px;
  width: 270px;
  height: 75px;
  line-height: 1.5;
}
.category-book-itemMain-title {
  color: #333;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.category-book-itemMain-author {
  color: #999;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.category-book-itemMain-intro {
  color: #999;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.category-book-itemMain-important {
  color: #666;
  font-size: 12px;
}
</style>
