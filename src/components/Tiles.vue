<template>
  <b-card-group columns>
    <b-card
      v-for="(musicInfo, i) in musicInfos"
      :key="i"
      :img-src="channelImgs[musicInfo.artist]"
      :img-alt="`${musicInfo.artist} - ${musicInfo.music}`"
      overlay
      @click="handleClick"
    ></b-card>
    <div class="mini-audio-player">
      <div class="play-btn-continer">
        <i class="play-btn"></i>
      </div>
    </div>
  </b-card-group>
</template>

<script>
import { getApiKey, getChannelImgs } from "../apis";

export default {
  name: "Tiles",
  data() {
    return {
      channelImgs: [],
      musicInfos: [],
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
  },
  methods: {
    handleClick(e) {
      console.log("sdlkjf");
      if (e.target.classList.contains("card-body")) {
        this.$store.commit("setModalState", true);
        this.playMusic(e.target.parentElement.children[0].alt);
      }
    },
    playMusic(musicName) {
      window.wavesurfer.load(`../audios/${musicName}.mp3`);
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

    const artists = orders.map((order) => order.artist);
    const musicInfos = orders.reduce((acc, { artist, musics }) => {
      const musicsOfCurrArtist = musics.map((music) => {
        return { artist, music };
      });
      return [...acc, ...musicsOfCurrArtist];
    }, []);

    const API_KEY = await getApiKey("./youtube_data_api_v3_key.txt");

    const oldObj = JSON.parse(sessionStorage.getItem("channelImgs"));
    const channelImgs = await getChannelImgs(oldObj, artists, API_KEY);

    this.musicInfos = musicInfos;
    this.channelImgs = channelImgs;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.card-columns {
  margin: 0 auto;
  width: 50%;
  height: 50%;
}

/* img.focus {
  filter: brightness(40%) blur(0.3em);
  transform: translate(-50%, -50%);
} */

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
