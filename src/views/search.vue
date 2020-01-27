<template>
  <div class="search" v-title="header.title">
    <m-header :title="header.title">
      <!--<a slot="label">123</a>-->
    </m-header>
    <div :style="{ height: scrollHeight }">
      <cube-scroll>
        <div>
          <div class="searchBox">
            <div class="searchBox-main">
              <input v-model="searchText" placeholder="请输入搜素内容..." />
              <i class="iconfont icon-search"></i>
            </div>
            <div class="searchBox-button" @click="toResult(searchText)">
              确定
            </div>
          </div>
          <div
            class="auto-complete"
            :style="{ height: autoCompleteHeight }"
            v-show="searchText !== ''"
          >
            <div
              class="auto-complete-item"
              v-for="(item, index) in autoCompleteData"
              :key="index"
              @click="toResult(item)"
            >
              {{ item }}
            </div>
          </div>
          <div class="hot">
            <div class="hot-title">
              <div class="hot-title-left">热门推荐</div>
              <div class="hot-title-right" @click="changeHotKeyWord">
                <p>换一批</p>
                <i class="iconfont icon-refresh"></i>
              </div>
            </div>
            <div class="hot-main">
              <div
                class="hot-item"
                v-for="(item, index) in hotKeyWordsByRandom"
                :key="index"
                @click="toResult(item)"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <div class="history">
            <div class="history-title">
              <div class="history-title-left">搜索历史</div>
              <div class="history-title-right" @click="deleteHistory">
                <p>删除历史</p>
                <i class="iconfont icon-delete"></i>
              </div>
            </div>
            <div class="history-main">
              <div
                class="history-item"
                v-for="(item, index) in history"
                :key="index"
                @click="toResult(item)"
              >
                {{ item }}
              </div>
            </div>
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
import { debounce } from "@/plugins/common";
export default {
  components: {
    mHeader,
    mFooter
  },
  data() {
    return {
      header: {
        title: "搜索"
      },
      searchText: "",
      autoCompleteData: [],
      hotKeyWords: [],
      hotKeyWordsByRandom: [],
      history: []
    };
  },
  created() {
    this.gethotkeyword();
    this.getHistory();
  },
  computed: {
    scrollHeight: function() {
      return (
        document.body.clientHeight -
        (24.53333 * document.body.clientWidth) / 100 +
        "px"
      );
    },
    autoCompleteHeight: function() {
      return (
        document.body.clientHeight -
        (41.86666 * document.body.clientWidth) / 100 +
        "px"
      );
    }
  },
  methods: {
    gethotkeyword() {
      this.$axios.get("/book/search-hotwords").then(res => {
        let hotKeyWords = [];
        if (res.data && res.data.searchHotWords) {
          for (let i = 0; i < res.data.searchHotWords.length; i++) {
            hotKeyWords.push(res.data.searchHotWords[i].word);
          }
        }
        this.hotKeyWords = hotKeyWords;
        this.changeHotKeyWord();
      });
    },
    changeHotKeyWord() {
      let _i = 6;
      let hotKeyWordsByRandom = [];
      let _tempIndex = {};
      if (this.hotKeyWords.length < 6) {
        _i = this.hotKeyWords.length;
      }
      for (let i = 0; i < _i; i++) {
        this.pushHotKeyWordsByRandom(_tempIndex, hotKeyWordsByRandom);
      }
      this.hotKeyWordsByRandom = hotKeyWordsByRandom;
    },
    pushHotKeyWordsByRandom(_tempIndex, hotKeyWordsByRandom) {
      let _tempIndexItem = Math.floor(Math.random() * this.hotKeyWords.length);
      if (_tempIndex[_tempIndexItem]) {
        this.pushHotKeyWordsByRandom(_tempIndex, hotKeyWordsByRandom);
      } else {
        _tempIndex[_tempIndexItem] = true;
        hotKeyWordsByRandom.push(this.hotKeyWords[_tempIndexItem]);
      }
    },
    getHistory() {
      let history = localStorage.getItem("search_history");
      if (history) {
        this.history = JSON.parse(history);
      }
    },
    deleteHistory() {
      this.history = [];
      localStorage.removeItem("search_history");
      this.$createToast({
        txt: "删除成功",
        type: "txt",
        time: 1000
      }).show();
    },
    debounceSearchText: debounce(({ vm, val }) => {
      vm.autoCompleteSearch(val);
    }, 500),
    autoCompleteSearch(val) {
      this.$axios.get("/book/auto-complete?query=" + val, {}).then(res => {
        let autoCompleteData = [];
        if (res.data && res.data.keywords) {
          for (let i = 0; i < res.data.keywords.length; i++) {
            autoCompleteData.push(res.data.keywords[i]);
          }
        }
        this.autoCompleteData = autoCompleteData;
      });
    },
    toResult(val) {
      let history = localStorage.getItem("search_history");
      if (history) {
        history = JSON.parse(history);
        if (history.length >= 5) {
          history.splice(4, history.length - 4);
        }
      } else {
        history = [];
      }
      let isNotIn = history.every(item => {
        return item !== val;
      });
      if (isNotIn) {
        history.unshift(val);
      }
      localStorage.setItem("search_history", JSON.stringify(history));
      this.$router.push({
        path: "/searchResult",
        query: {
          query: val
        }
      });
    }
  },
  watch: {
    searchText(val) {
      this.autoCompleteData = [];
      this.debounceSearchText({ vm: this, val });
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  .searchBox {
    width: 375px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    padding: 15px 15px 30px;
    .searchBox-main {
      flex: 1;
      position: relative;
      input {
        width: 100%;
        height: 35px;
        line-height: 35px;
        background-color: #ebebf0;
        border-radius: 15px;
        font-size: 12px;
        color: #666;
        outline: none;
        box-sizing: border-box;
        padding: 0 20px 0 36px;
      }
      i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
      }
    }
    .searchBox-button {
      height: 35px;
      line-height: 35px;
      font-size: 14px;
      color: #666;
      padding: 0 5px;
      margin-left: 10px;
    }
  }
  .auto-complete {
    width: 375px;
    position: absolute;
    top: 65px;
    left: 0;
    background-color: #fff;
    .auto-complete-item {
      padding: 15px;
      font-size: 14px;
      color: #333;
    }
  }
  .hot {
    .hot-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      color: #666;
      .hot-title-left {
        font-size: 20px;
      }
      .hot-title-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        i {
          font-size: 14px;
          margin-left: 5px;
        }
      }
    }
    .hot-main {
      padding: 15px;
      display: flex;
      flex-wrap: wrap;
      .hot-item {
        font-size: 14px;
        color: #666;
        padding: 10px 15px;
        margin: 0 10px 10px 0;
        background-color: #efeff4;
        border-radius: 10px;
      }
    }
  }
  .history {
    margin-top: 20px;
    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      color: #666;
      .history-title-left {
        font-size: 20px;
      }
      .history-title-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        i {
          font-size: 14px;
          margin-left: 5px;
        }
      }
    }
    .history-main {
      padding: 15px;
      .history-item {
        font-size: 14px;
        color: #666;
        padding: 15px 0;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
