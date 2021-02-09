<template>
  <div class="audio-player">
    <div class="waveform"></div>
    <div class="audio-control">
      <div class="play-btn-container" @click="togglePlay">
        <font-awesome-icon class="play-btn" :icon="playBtnIcon" size="lg" />
      </div>
      <div class="volume-control">
        <div
          class="volume-btn-container"
          @click="toggleMute"
          @mouseenter="showSlider"
          @mouseleave="hideSlider"
        >
          <font-awesome-icon
            class="volume-btn"
            :icon="volumeBtnIcon"
            size="lg"
          />
        </div>
        <div
          class="volume-slider"
          :class="isSliderShow"
          @click="changeVolume"
          @mouseenter="showSlider"
          @mouseleave="hideSlider"
        >
          <div
            class="volume-percentage"
            :style="{ width: $store.getters.getVolumePercentage }"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <!-- https://github.com/FortAwesome/vue-fontawesome -->
  <!-- ERR: infinity call event on slider -->
</template>

<script>
export default {
  name: "Player",
  data() {
    return {
      isSliderShow: "",
    };
  },
  computed: {
    playBtnIcon() {
      return this.$store.state.isPlaying ? "pause" : "play";
    },
    volumeBtnIcon() {
      return this.$store.getters.getVolumeString;
    },
  },
  methods: {
    togglePlay() {
      window.wavesurfer.playPause();
      this.$store.commit(
        "setPlayingState",
        this.$store.state.isPlaying ? false : true
      );
    },
    toggleMute() {
      window.wavesurfer.toggleMute();
      if (this.$store.state.volume === 0) {
        this.$store.commit("setVolumeState", this.$store.state.previousVolume);
      } else {
        this.$store.commit("setVolumeState", 0);
      }
    },
    showSlider() {
      this.isSliderShow = "hover";
    },
    hideSlider() {
      this.isSliderShow = "";
    },
    changeVolume(e) {
      const newVolume = e.offsetX / parseInt(e.currentTarget.offsetWidth);
      this.$store.commit("setVolumeState", newVolume);
      this.styleObject = {
        width: this.$store.getters.getVolumePercentage,
      };
    },
  },
};
</script>

<style scoped>
wave {
  width: 100%;
}

.audio-player {
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.waveform {
  cursor: pointer;
  margin: 0% 5em;
}

.audio-control {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2em auto;
}

.audio-player .play-btn {
  cursor: pointer;
  margin: auto 0.5em;
}

.audio-player .play-btn:hover {
  transform: scale(1.1);
}

.volume-control {
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-player .volume-btn {
  cursor: pointer;
  margin: auto 0.5em;
}

.audio-player .volume-btn:hover {
  transform: scale(1.1);
}

.volume-slider {
  display: inline-block;
  cursor: pointer;
  height: 0.7em;
  width: 0;
  background-color: violet;
  transition: 0.25s;
}

.hover {
  width: 7em;
}

.volume-percentage {
  background: purple;
  height: 100%;
  width: 50%;
}
</style>
