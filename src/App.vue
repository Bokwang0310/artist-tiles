<template>
  <div id="app">
    <Header />
    <Tiles />
    <Modal />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Tiles from "./components/Tiles.vue";
import Modal from "./components/Modal.vue";
import store from "./store.js";

export default {
  name: "App",
  store,
  components: {
    Header,
    Tiles,
    Modal,
  },
};
</script>

<style>
* {
  user-select: none;
  -webkit-user-drag: none;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
}
body {
  background: linear-gradient(
    180deg,
    rgba(246, 235, 255, 1) 0%,
    rgba(255, 255, 255, 1) 15%,
    rgba(255, 255, 255, 1) 85%,
    rgba(238, 252, 255, 1) 100%
  );
}
</style>
