import { createStore } from 'vuex'
import Axios from 'axios'
import { apiUrl } from '@/config'

export default createStore({
  state: {
    categories: []
  },
  getters: {
    categoriesAmount (state) {
      return state.categories.length
    }
  },
  mutations: {
    UPDATE_CATEGORIES (state, data) {
      state.categories = data
    }
  },
  actions: {
    async fetchCategories ({ commit }) {
      const res = await Axios.get(`${apiUrl}/categories`)
      commit('UPDATE_CATEGORIES', res.data)
    }
  },
  modules: {
  }
})
