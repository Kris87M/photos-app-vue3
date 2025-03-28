import axios from 'axios'
import { apiUrl } from '@/config'

export default {
  namespaced: true,
  state: {
    photos: [],
    request: {
      pending: false,
      error: false,
      success: false
    },
    allPhotosLoaded: false
  },
  getters: {},
  mutations: {
    UPDATE_PHOTOS (state, data) {
      state.photos = data
    },
    ADD_PHOTOS (state, data) {
      state.photos = [...state.photos, ...data]
    },
    START_REQUEST (state) {
      state.request = { pending: true, error: false, success: false }
    },
    END_REQUEST (state) {
      state.request = { pending: false, error: false, success: true }
    },
    ERROR_REQUEST (state) {
      state.request = { pending: false, error: true, success: false }
    },
    TOGGLE_ALL_LOADED (state) {
      state.allPhotosLoaded = !state.allPhotosLoaded
    },
    ADD_VOTE (state, id) {
      const photo = state.photos.find(photo => photo._id === id)
      if (photo) {
        photo.votes++
      }
    }
  },
  actions: {
    async fetchPhotosFromAPI ({ commit, state }, { url, page }) {
      try {
        if (state.allPhotosLoaded && page === 1) commit('TOGGLE_ALL_LOADED')
        if (state.allPhotosLoaded) return false

        commit('START_REQUEST')
        const res = await axios.get(url)
        await new Promise((resolve, reject) => { setTimeout(resolve, 1000) })
        commit('END_REQUEST')

        if (res.data.length < 12) commit('TOGGLE_ALL_LOADED')
        if (page > 1) commit('ADD_PHOTOS', res.data)
        else commit('UPDATE_PHOTOS', res.data)
      } catch (err) {
        commit('ERROR_REQUEST')
      }
    },
    async fetchPhotos ({ dispatch }, page) {
      dispatch('fetchPhotosFromAPI', { url: `${apiUrl}/photos/${page}`, page })
    },
    async fetchCategory ({ dispatch }, { category, page }) {
      dispatch('fetchPhotosFromAPI', { url: `${apiUrl}/photos/${category}/${page}`, page })
    },
    async addVote ({ commit }, id) {
      try {
        commit('START_REQUEST')
        await axios.put(`${apiUrl}/photos/vote/${id}`)
        commit('END_REQUEST')
        commit('ADD_VOTE', id)
      } catch (err) {
        commit('ERROR_REQUEST')
      }
    }
  }
}
