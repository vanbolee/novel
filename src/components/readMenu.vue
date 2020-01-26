<template>
  <cube-popup
    type="read-menu"
    position="left"
    @mask-click.stop="maskClick"
    ref="menu"
  >
    <div
      class="read-menu"
      :style="{ transform: inshow ? 'translateX(0%)' : 'translateX(-100%)' }"
      @touchmove.stop
      @click.stop
    >
      <div class="read-menu-main">
        <div class="read-menu-main-title">{{ this.$parent.bookName }}</div>
        <div class="read-menu-main-text">目录</div>
        <div
          class="read-menu-main-item"
          v-for="(item, index) in data"
          :key="index"
          @click="changeChapterIndex(index)"
        >
          <p
            :style="{
              color: $parent.source.menuIndex - 1 === index ? '#8ECDFC' : ''
            }"
          >
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </cube-popup>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      inshow: false
    };
  },
  methods: {
    toLockContent(type) {
      let _dom = this.$parent.$refs.read; //document.documentElement || document.body
      this.top = _dom.scrollTop;
      if (type === "start") {
        _dom.style.overflow = "hidden";
      } else {
        _dom.style.overflow = "scroll";
        _dom.scrollTop = this.top;
      }
    },
    maskClick() {
      this.$emit("menu-change", "hide");
    },
    changeChapterIndex(index) {
      this.$emit("change-chapter-index", index);
    },
    show() {
      this.toLockContent("start");
      this.$refs.menu.show();
      setTimeout(() => {
        this.inshow = true;
      }, 100);
    },
    hide() {
      this.toLockContent("end");
      this.inshow = false;
      setTimeout(() => {
        this.$refs.menu.hide();
      }, 200);
    }
  }
};
</script>

<style lang="less" scoped>
.read-menu {
  width: 230px;
  height: 100%;
  overflow: scroll;
  background: #fff;
  transition: transform 0.2s ease;
}
.read-menu-main {
  .read-menu-main-title {
    color: #333;
    font-size: 16px;
    margin: 20px 20px 10px;
  }
  .read-menu-main-text {
    color: #999;
    font-size: 14px;
    padding: 10px 20px;
    border-bottom: 1px solid #f0f0f0;
  }
  .read-menu-main-item {
    font-size: 12px;
    color: #999;
    p {
      margin-left: 20px;
      border-bottom: 1px solid #f0f0f0;
      padding: 15px 0;
    }
  }
}
</style>
