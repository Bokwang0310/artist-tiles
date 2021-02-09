<template>
  <div class="modal" v-show="isModalShow" @click="hideModal">
    <div class="modal-content">
      <div class="modal-close-container">
        <font-awesome-icon class="modal-close" icon="times" />
      </div>
      <Player />
    </div>
  </div>
</template>

<script>
import Player from "./Player.vue";
import { mapState } from "vuex";

export default {
  name: "Modal",
  components: {
    Player,
  },
  methods: {
    hideModal(e) {
      if (
        e.target === document.querySelector(".modal") ||
        e.target === document.querySelector(".modal-close-container")
      ) {
        this.$store.commit("setModalState", false);
      }
    },
  },
  computed: {
    ...mapState(["isModalShow"]),
  },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-content {
  position: fixed;
  background-color: #fefefe;
  left: 0;
  right: 0;
  margin: 6em auto;
  width: 70%; /* 70% */
  height: 70%;
  padding: 1.4%;
  border: 1px solid #aaa;
  opacity: 90%;
  border-radius: 0.2em;
  overflow: hidden;
}

.modal-close {
  line-height: 0.6;
  color: #aaa;
  float: right;
  font-size: 2em;
  font-weight: bold;
}

.modal-close:hover {
  cursor: pointer;
  color: black;
}
</style>
