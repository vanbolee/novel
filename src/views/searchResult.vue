<template>
  <div v-title="header.title">
    <m-header :title="header.title">
      <!--<a slot="label">123</a>-->
    </m-header>
    <div class="searchResult" :style="{ height: scrollHeight }">
      <cube-scroll>
        <router-link
          :to="{ path: 'book', query: { id: item.id } }"
          tag="div"
          class="searchResult-item"
          v-for="(item, index) in resultData"
          :key="index"
        >
          <div class="searchResult-item-img">
            <img v-lazy="item.img" :key="item.img" />
          </div>
          <div class="searchResult-item-main">
            <p class="searchResult-item-name" v-text="item.name"></p>
            <p class="searchResult-item-author" v-text="item.author"></p>
            <p class="searchResult-item-intro" v-text="item.intro"></p>
            <p class="searchResult-item-more">
              <span
                style="color: #ed424b;"
                v-text="item.retentionRatio + '%留存'"
              ></span>
              <span v-html="'&nbsp;&nbsp;|&nbsp;&nbsp;'"></span>
              <span
                style="color: #4284ed;"
                v-text="item.latelyFollower + '人气'"
              ></span>
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
        title: "搜素结果页"
      },
      resultData: []
    };
  },
  created() {
    this.toSearch();
  },
  methods: {
    toSearch() {
      this.$axios
        .get("/book/fuzzy-search?query=" + this.$route.query.query, {})
        .then(res => {
          let resultData = [];
          if (res.data && res.data.books) {
            for (let i = 0; i < res.data.books.length; i++) {
              resultData.push({
                id: res.data.books[i]._id,
                author: res.data.books[i].author,
                name: res.data.books[i].title,
                img: this.$store.state.imgHeader + res.data.books[i].cover,
                intro: res.data.books[i].shortIntro,
                retentionRatio: res.data.books[i].retentionRatio || 0,
                latelyFollower: this.formatPeople(
                  res.data.books[i].latelyFollower
                )
              });
            }
          }
          this.resultData = resultData;
        });
    },
    formatPeople(nums) {
      if (nums > 9999) {
        return parseFloat((nums / 10000).toFixed(1)) + "万";
      } else {
        return nums;
      }
    }
  },
  computed: {
    scrollHeight: function() {
      return (
        document.body.clientHeight -
        (10.66667 * document.body.clientWidth) / 100 +
        "px"
      );
    }
  }
};
</script>

<style lang="less" scoped>
.searchResult {
  background-color: #fff;
  .searchResult-item {
    padding: 10px 0;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
    }
    .searchResult-item-img {
      width: 66px;
      height: 88px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .searchResult-item-main {
      width: 280px;
      margin-left: 9px;
      font-size: 12px;
      color: #969ba3;
      flex: 1;
      .searchResult-item-name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 8px;
        padding-top: 6px;
        color: #333;
      }
      .searchResult-item-author {
        margin-bottom: 8px;
      }
      .searchResult-item-intro {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 6px;
      }
    }
  }
}
</style>
