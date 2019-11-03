<template>
  <div class="juke-box" :class="{'is-modal': isModal}">
    <div class="juke-box-header" v-if="isModal">
      <div class="modal-close">
        <i @click="isModal = false" class="fal fa-angle-down click-icon"></i>
      </div>
      <div class="switch-list">
        <i class="fal fa-list click-icon"></i>
      </div>
    </div>
    <div class="minimal">
      <img src="~/assets/img/albums/nigetara.jpg" alt class="jacket" />
      <div class="title-info" @click="isModal=true">
        <div class="song-title">ラスボスはもうひとりの君</div>
        <div class="album-title">
          逃げたらいーじゃん。
          <div class="release-date" v-if="isModal">2019年11月</div>
        </div>
      </div>
      <div class="play-button-wrapper">
        <PlayButton />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.juke-box {
  position: fixed;
  z-index: 10;
  bottom: 10px;
  left: 10px;
  width: 100%;
  height: 70px;
  max-width: 400px;
  transition: all 0.3s;
  border: 1px solid #999;
  border-radius: 4px;
  .minimal {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
  }
  &.is-modal {
    height: 80vh;
    .minimal {
      align-items: center;
      height: auto;
    }
    .jacket {
      width: 130px;
      height: 130px;
      margin-right: 10px;
    }
    .title-info {
      align-items: flex-start;
      display: flex;
      justify-content: center;
      flex-direction: column;
      &:hover {
        opacity: 1;
        cursor: default;
      }
      .song-title {
        display: none;
      }
      .album-title {
        font-size: 1.1rem;
        font-weight: 600;
      }
      .release-date {
        font-size: 10px;
      }
    }
    .play-button-wrapper {
      display: none;
    }
  }
  &-header {
    display: flex;
    align-items: center;
    text-align: center;
    .modal-close {
      flex-grow: 1;
      i {
        font-size: 1.8rem;
        padding: 0.5rem;
      }
    }
    .switch-list {
      width: 3rem;
      flex-shrink: 0;
    }
  }
}
.jacket {
  margin-right: 0.5rem;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  flex-shrink: 0;
  transition: 0.4s 0.1s;
}
.title-info {
  flex-grow: 1;
  cursor: pointer;
  .song-title {
    font-weight: 600;
  }
  .album-title {
    font-size: 12px;
  }
  &:hover {
    opacity: 0.8;
  }
}
.play-button-wrapper {
  flex-shrink: 0;
  line-height: 1;
}
</style>

<script>
import PlayButton from './PlayButton'
export default {
  components: {
    PlayButton
  },
  data() {
    return {
      isModal: false
    }
  }
}
</script>
