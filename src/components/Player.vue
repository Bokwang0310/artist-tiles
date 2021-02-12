<template>
  <div class="audio-player">
    <div class="waveform"></div>
    <div class="audio-control">
      <div class="play-btn-container" @click="togglePlay">
        <font-awesome-icon class="play-btn" :icon="playBtnIcon" size="lg" />
      </div>
      <div
        class="volume-control"
        @mouseenter="showSlider"
        @mouseleave="hideSlider"
      >
        <div class="volume-btn-container" @click="toggleMute">
          <font-awesome-icon
            class="volume-btn"
            :icon="volumeBtnIcon"
            size="lg"
          />
        </div>
        <div
          class="volume-slider"
          :style="isSliderShow"
          @click="changeVolume"
          @mouseenter="showSlider"
        >
          <div
            class="volume-percentage"
            :style="{ width: $store.getters.getVolumePercentage }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Player",
  data() {
    return {
      isSliderShow: { width: 0 },
      timer: null,
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
      clearTimeout(this.timer);
      this.isSliderShow = { width: "7em" };
    },
    hideSlider() {
      this.timer = setTimeout(() => {
        this.isSliderShow = { width: 0 };
      }, 500);
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

.audio-player .play-btn:hover,
.audio-player .volume-btn:hover {
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

.volume-slider {
  display: inline-block;
  cursor: pointer;
  height: 0.7em;
  width: 0;
  background-color: violet;
  transition: 0.3s;
  transform: translateZ(0);
}

.volume-percentage {
  background: purple;
  height: 100%;
}
</style>
