import pd from "./player-data.js";
const playerData = pd.songs;

const MusicPlayer = Vue.component("music-player", {
  props: {
    playerData: {
      type: Object
    }
  },
  data: function() {
    return {
      currentPlayIndex: 0,
      audio: new Audio(),
      canvas: null,
      currentSongInfo: {},
      isPlay: false,
      isMute: false
    };
  },
  computed: {},
  methods: {
    changeSong: function() {
      const currentData = playerData[this.currentPlayIndex];
      this.currentSongInfo = {
        title: currentData.title,
        album: currentData.album,
        src: currentData.src,
        img: currentData.img
      };
      this.audio.src = playerData[this.currentPlayIndex].src;
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          this.audio.muted = false;
          this.audio.play();
        });
      }
      //this.audio.oncanplay = () => {};
      this.audio.onended = () => {
        this.currentPlayIndex++;
        if (this.currentPlayIndex > playerData.length - 1) {
          this.currentPlayIndex = 0;
        }
        this.changeSong();
      };
    },
    clickPlayBtn: function() {
      if (!this.audio.paused) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.isPlay = !this.audio.paused;
    },
    clickMuteBtn: function() {
      this.audio.muted = !this.audio.muted;
      this.isMute = this.audio.muted;
    }
  },
  mounted() {
    this.changeSong();
  },
  template: `
	<div class="music-player">
		<div class="music-player-inner">
			<div class="play-volume btn" :class="{'is-mute': isMute}" @click="clickMuteBtn"><i class="btn-mute-off fas fa-volume-mute"></i><i class="btn-mute-on fas fa-volume-up"></i><div class="tooltip">SOUND <span v-if="isMute">ON</span><span v-if="!isMute">OFF</span></div></div>
			<div class="play-btn btn" :class="{'is-play': isPlay}" @click="clickPlayBtn"><i class="btn-play fas fa-play"></i><i class="btn-pause fas fa-pause"></i></div>
			<div class="song-info">
				<img class="song-album-image" :src="currentSongInfo.img" :alt="currentSongInfo.album" />
				<div class="song-info-main">
					<div class="song-title">「<span v-text="currentSongInfo.title"></span>」</div>
					<div class="song-album" v-text="currentSongInfo.album"></div>
				</div>
			</div>
		</div>
	</div>
`
});

export default MusicPlayer;
