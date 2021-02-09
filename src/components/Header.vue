<template>
  <header>
    <h1>Artist Tiles</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  display: flex;
  height: 7em;
  align-items: center;
}
h1 {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  /* text-transform: uppercase; */
  text-align: center;
  font-size: 3.5rem;
  width: 100%;
  margin-bottom: 0;
  line-height: 100%;
  height: fit-content;
}
</style>
