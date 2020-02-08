import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clientWidth: "",
    clientHeight: "",
    imgHeader: "https://statics.zhuishushenqi.com"
  },
  mutations: {
    initClientData(state, newState) {
      state.clientWidth = newState.clientWidth;
      state.clientHeight = newState.clientHeight;
    }
  },
  actions: {},
  modules: {}
});
