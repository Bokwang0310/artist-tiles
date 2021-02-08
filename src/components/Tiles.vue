<template>
  <div class="container">
    <div
      v-for="(musicInfo, i) in musicInfos"
      class="img-box"
      :key="i"
      @click="
        $store.commit('setModalState', true);
        playMusic($event);
      "
    >
      <img
        :src="channelImgs[musicInfo.artist]"
        :alt="`${musicInfo.artist} - ${musicInfo.music}`"
      />
      <div class="mini-audio-player">
        <div class="play-btn-continer">
          <i class="play-btn"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tiles",
  data() {
    return {
      channelImgs: [],
      musicInfos: [],
    };
  },
  methods: {
    playMusic(e) {
      window.wavesurfer.load(`../audios/${e.target.alt}.mp3`);
      window.wavesurfer.on("ready", () => {
        window.wavesurfer.play();
        this.$store.commit("setPlayingState", true);
      });
    },
  },
  async mounted() {
    // :(
    window.wavesurfer = window.WaveSurfer.create({
      container: ".waveform",
      waveColor: "violet",
      progressColor: "purple",
      cursorColor: "#333",
      cursorWidth: 2,
      barHeight: 0.8,
      height: 250,
      width: 500,
      barWidth: 5,
      responsive: true,
      barRadius: 2,
      autoCenter: true,
      scrollParent: false,
      hideScrollbar: true,
      barMinHeight: 2,
      normalize: true,
    });
    window.wavesurfer.setVolume(0.5);

    const orders = await fetch("../order.json")
      .then((res) => res.json())
      .catch((err) => console.error(err));

    // const artists = orders.map((order) => order.artist);
    const musicInfos = orders.reduce((acc, { artist, musics }) => {
      const musicsOfCurrArtist = musics.map((music) => {
        return { artist, music };
      });
      return [...acc, ...musicsOfCurrArtist];
    }, []);

    const channelImgs = await fetch(
      "../channel_img_list_example.json"
    ).then((res) => res.json());

    this.musicInfos = musicInfos;
    this.channelImgs = channelImgs;
  },
};
</script>

<style scoped>
.container {
  display: grid;
  max-width: 55em;
  width: 100%;
  margin: 0 auto;
  min-height: 27em; /* 400px */
  grid-template-columns: repeat(auto-fill, minmax(13em, 1fr)); /* 150px */
  grid-auto-rows: 1em; /* 20px */
  grid-gap: 0.7em; /* 5px */
}

.img-box {
  width: 100%;
  overflow: hidden;
  position: relative;
}

img {
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

img.focus {
  filter: brightness(40%) blur(0.3em);
  transform: translate(-50%, -50%);
}

.mini-audio-player.show {
  color: white;
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.mini-audio-player {
  display: none;
}

.mini-audio-player .play-btn:hover {
  transform: scale(1.1);
}
</style>
