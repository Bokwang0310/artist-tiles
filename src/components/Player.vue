<template>
  <div class="audio-player">
    <div class="waveform"></div>
    <div class="audio-control">
      <div class="play-btn-container">
        <i class="play-btn fas fa-pause fa-lg"></i>
      </div>
      <div class="volume-control">
        <div class="volume-btn-container">
          <i class="volume-btn fas fa-volume-up fa-lg"></i>
        </div>
        <div class="volume-slider">
          <div class="volume-percentage"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Player",
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
