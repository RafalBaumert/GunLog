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

    updateGunDetails(context, payload) {
      context.commit('updateGunDetails', payload);
    },

    updateGunDetailsEdited(context, payload) {
      context.commit('updateGunDetailsEdited', payload);
    },

    clearGunDetailsEdited(context) {
      context.commit('clearGunDetailsEdited');
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

    updateGunDetails(state, payload) {
      state.gunDetails = {
        ...state.gunDetails,
        ...payload,
      };
    },

    updateGunDetailsEdited(state, payload) {
      state.gunDetailsEdited = {
        ...state.gunDetailsEdited,
        ...payload,
      };
    },

    clearGunDetailsEdited(state) {
      delete state.gunDetailsEdited;
    },
  },
});

export default store;
