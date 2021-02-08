import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isModalShow: false,
    isPlaying: false,
    volume: 0.5,
  },
  mutations: {
    setModalState(state, newState) {
      state.isModalShow = newState;
    },
    setPlayingState(state, newState) {
      state.isPlaying = newState;
    },
    setVolumeState(state, newState) {
      window.wavesurfer.setVolume(newState);
      state.volume = newState;
    },
  },
  getters: {
    getVolumeString(state) {
      if (state.volume === 0) {
        return "volume-mute";
      }
      if (state.volume >= 0.5) {
        return "volume-up";
      }
      if (state.volume < 0.5) {
        return "volume-down";
      }
    },
    getVolumePercentage(state) {
      return `${state.volume * 100}%`;
    },
  },
});

// https://kdydesign.github.io/2019/05/09/vuex-tutorial/
