<template>
  <div class="play-button" @click="playing = !playing">
    <i class="fal" :class="iconClassName"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playing: false
    }
  },
  computed: {
    iconClassName() {
      return this.playing ? 'fa-play' : 'fa-pause'
    }
  }
}
</script>

<style lang="scss" scoped>
.play-button {
  padding: 0 0.5rem;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #2c2c2c;
  }
  &:active {
    background-color: #292929;
    color: #999;
  }
}
</style>
