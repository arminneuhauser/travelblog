import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      cacheVersion: '',
      settings: {
        main_navi: []
      },
      layout: 'default'
    },
    mutations: {
      setSettings (state, settings) {
        state.settings = settings
      },
      setCacheVersion (state, version) {
        state.cacheVersion = version
      },
      setLayout (state, layout) {
        state.layout = layout
      }
    },
    actions: {
      nuxtServerInit ({ commit }, context) {
        return this.$storyapi.get(`cdn/stories/settings`, {
          version: context.version
        }).then((res) => {
          commit('setSettings', res.data.story.content)
        })
      }
    }
  })
}

export default createStore
