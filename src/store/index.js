import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      user: {},
    };
  },

  getters: {
    isAuthenticated(state) {
      // If we have a token we are authenticated
      return !!state.user.token;
    },
  },
  actions: {
    loadGunDetails(context, gunDetails) {
      context.commit('gunLogDetails', gunDetails);
    },
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    gunLogDetails(state, payload) {
      state.gunDetails = payload;
    },

    deleteGunLogDetails(state) {
      delete state.gunDetails; // delete proprty from the object
    },

    setGunsStorage(state, payload) {
      state.gunsStorage = payload;
    },
  },
});

export default store;
