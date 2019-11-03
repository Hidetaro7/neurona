<template>
  <div class="app">
    <nuxt />
    <JukeBox />
  </div>
</template>


<script>
import JukeBox from '../components/JukeBox'
export default {
  components: {
    JukeBox
  }
}
</script>

<style lang="scss" scoped>
.app {
  position: relative;
}
</style>
