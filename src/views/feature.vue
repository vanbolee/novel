<template>
  <div v-title="header.title">
    <m-header :title="header.title">
      <!--<a slot="label">123</a>-->
    </m-header>
    <div class="feature" :style="{ height: scrollHeight }">
      <cube-scroll>
        <div class="feature-swiper">
          <cube-slide :data="swiperData">
            <cube-slide-item v-for="(item, index) in swiperData" :key="index">
              <router-link
                :to="{ path: 'book', query: { id: item.id } }"
                tag="div"
                class="feature-swiper-item"
              >
                <img v-lazy="item.img" :key="item.img" />
              </router-link>
            </cube-slide-item>
          </cube-slide>
        </div>
        <div class="feature-main">
          <div
            class="feature-item"
            v-for="(item, index) in featureData"
            :key="index"
          >
            <div class="feature-item-title">
              <span v-text="item.name"></span>
              <span>更多&gt;</span>
            </div>
            <router-link
              :to="{ path: 'book', query: { id: items.id } }"
              tag="div"
              class="feature-items"
              v-for="(items, index) in item.children"
              :key="index"
            >
              <div class="feature-items-img">
                <img v-lazy="items.img" key="items.img" />
              </div>
              <div class="feature-items-main">
                <p class="feature-items-name" v-text="items.name"></p>
                <p class="feature-items-intro" v-text="items.intro"></p>
                <p class="feature-items-category">
                  <span v-text="items.minorCate"></span>
                  <span v-html="'&nbsp;&nbsp;|&nbsp;&nbsp;'"></span>
                  <span class="red" v-text="items.latelyFollower"></span>
                  <span v-text="'人气'"></span>
                  <span
                    class="feature-items-major"
                    v-text="items.majorCate"
                  ></span>
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </cube-scroll>
    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
import mHeader from "@/components/header";
import mFooter from "@/components/footer";

export default {
  components: {
    mHeader,
    mFooter
  },
  data() {
    return {
      header: {
        title: "精选"
      },
      id: "5910018c8094b1e228e5868f",
      swiperData: [],
      featureData: []
    };
  },
  methods: {
    getData() {
      this.$axios.get("/recommendPage/nodes/" + this.id, {}).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].sex !== "none") {
            let _data = {
              alias: res.data.data[i].alias,
              name: res.data.data[i].title,
              id: res.data.data[i]._id,
              children: []
            };
            if (res.data.data[i].sex === "male") {
              this.featureData.unshift(_data);
            } else {
              this.featureData.push(_data);
            }
          }
        }
        this.getFeatureData();
      });
    },
    getSwiperData() {
      this.$axios
        .get("/recommendPage/node/spread/" + this.id, {
          params: {
            pl: "ios"
          }
        })
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.swiperData.push({
              id: res.data.data[i].link,
              img: res.data.data[i].img
            });
          }
        });
    },
    getFeatureData() {
      for (let i = 0; i < this.featureData.length; i++) {
        this.$axios
          .get("/recommendPage/books/" + this.featureData[i].id, {})
          .then(res => {
            if (res.data.data) {
              for (let j = 0; j < res.data.data.length; j++) {
                this.featureData[i].children.push({
                  id: res.data.data[j].book._id,
                  img: res.data.data[j].book.cover,
                  name: res.data.data[j].book.title,
                  intro: res.data.data[j].book.shortIntro,
                  minorCate: res.data.data[j].book.minorCate,
                  majorCate: res.data.data[j].book.majorCate,
                  latelyFollower: this.formatPeople(
                    res.data.data[j].book.latelyFollower
                  )
                });
              }
            }
          });
      }
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
        this.$store.state.clientHeight -
        (24.53333 * this.$store.state.clientWidth) / 100 +
        "px"
      );
    }
  },
  created() {
    this.getSwiperData();
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.feature {
  overflow-y: scroll;
}
.feature-swiper {
  width: 100%;
}
.feature-swiper-item {
  width: 100%;
  height: 120px;
  img {
    width: 100%;
    height: 100%;
  }
}
.feature-item {
  background-color: #fff;
  margin-bottom: 10px;
}
.feature-item-title {
  display: flex;
  padding: 15px;
  span {
    flex: 1;
    line-height: 16px;
    &:first-child {
      border-left: 2px solid #26a2ff;
      padding-left: 8px;
      font-size: 14px;
    }
    &:last-child {
      text-align: right;
      font-size: 12px;
      color: #26a2ff;
    }
  }
}
.feature-items {
  padding: 10px 15px;
  .feature-items-img {
    display: inline-block;
    vertical-align: middle;
    width: 64px;
    height: 82px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .feature-items-main {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    width: 271px;
    height: 82px;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-bottom: 1px solid #f0f0f0;
    }
    .feature-items-name {
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
      overflow: hidden;
      color: #333;
      padding: 5px 0;
    }
    .feature-items-intro {
      font-size: 12px;
      color: #999;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 1.5;
      height: 34px;
    }
    .feature-items-category {
      position: relative;
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      .feature-items-major {
        position: absolute;
        right: 0;
        bottom: 0;
        color: #ff8400;
        border: 1px solid #ff8400;
        padding: 1px 3px;
        transform: scale(0.8);
        transform-origin: bottom;
        border-radius: 2px;
        line-height: 12.8px;
      }
    }
  }
}
</style>
