<template>
  <div id="app">
    <app-header />
    <tiles />
    <modal />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import Tiles from "./components/Tiles.vue";
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    Tiles,
    Modal,
  },
};
</script>

<style>
* {
  user-select: none;
  -webkit-user-drag: none;
  margin: 0;
  padding: 0;
}

html {
  width: 100%;
  height: 100%;
}

html {
  background: linear-gradient(
    180deg,
    rgba(246, 235, 255, 1) 0%,
    rgba(255, 255, 255, 1) 15%,
    rgba(255, 255, 255, 1) 85%,
    rgba(238, 252, 255, 1) 100%
  );
}
</style>
