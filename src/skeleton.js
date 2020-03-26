import Vue from "vue";
import SkeletonIndex from "./skeleton/skeletonIndex.vue";

export default new Vue({
  components: {
    SkeletonIndex
  },
  template: `
    <div>
      <SkeletonIndex id="SkeletonIndex" style="display:none"/>
    </div>
  `
});
