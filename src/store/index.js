import { createStore } from 'vuex'
import Axios from 'axios'
import { apiUrl } from '@/config'

export default createStore({
  state: {
    categories: [],
    photos: []
  },
  getters: {
    categoriesAmount (state) {
      return state.categories.length
    }
  },
  mutations: {
    UPDATE_CATEGORIES (state, data) {
      state.categories = data
    },
    UPDATE_PHOTOS (state, data) {
      state.photos = data
    }
  },
  actions: {
    async fetchCategories ({ commit }) {
      const res = await Axios.get(`${apiUrl}/categories`)
      commit('UPDATE_CATEGORIES', res.data)
    },
    async fetchPhotos ({ commit }, page) {
      const res = await Axios.get(`${apiUrl}/photos/${page}`)
      commit('UPDATE_PHOTOS', res.data)
    },
    async fetchCategoryPhotos ({ commit }, { category, page }) {
      const res = await Axios.get(`${apiUrl}/photos/${category}/${page}`)
      commit('UPDATE_PHOTOS', res.data)
    }
  },
  modules: {
  }
})
