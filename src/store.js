import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    wrapWidth: window.innerWidth,
    wrapHeight: window.innerHeight
  },
  getters: {
    getWidth () {
      return this.state.innerWidth
    },
    getHeight () {
      return this.state.innerHeight
    }
  },
  mutations: {
    setWidth (state) {
      state.innerWidth = window.innerWidth
    },
    setHeight (state) {
      state.innerHeight = window.innerHeight
    }
  }
})

export default store
