import pd from "./player-data.js";
const playerData = pd.songs;

const MusicPlayer = Vue.component("music-player", {
  props: {
    releaseData: {
      type: Array
    }
  },
  data: function() {
    return {
      currentPlayIndex: 0,
      audio: new Audio(),
      canvas: null,
      currentSongInfo: {},
      isPlay: false,
      isMute: false,
      showAlbumDetail: false
    };
  },
  computed: {
    currentAlbumData() {
      const _currentAlbumData = {
        title: this.currentSongInfo.album,
        subTitle: null,
        img: this.currentSongInfo.img,
        link: null,
        songs: []
      };

      playerData.forEach(element => {
        if (element.category === this.currentSongInfo.category) {
          _currentAlbumData.songs.push(element.title);
        }
      });
      this.releaseData.forEach(element => {
        if (element.category === this.currentSongInfo.category) {
          _currentAlbumData.subTitle = element.sub;
          _currentAlbumData.link = element.link;
        }
        return;
      });
      return _currentAlbumData;
    }
  },
  methods: {
    changeSong: function() {
      const currentData = playerData[this.currentPlayIndex];
      this.currentSongInfo = {
        title: currentData.title,
        album: currentData.album,
        src: currentData.src,
        img: currentData.img,
        category: currentData.category
      };
      this.audio.src = playerData[this.currentPlayIndex].src;
      setTimeout(() => {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            this.audio.muted = false;
            this.audio.play();
          });
        }
      }, 100);
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
			<div class="song-info" @click="showAlbumDetail = !showAlbumDetail">
				<div class="arrow-up"><i class="fas fa-angle-up"></i></div>
				<div class="song-info-inner">
					<img class="song-album-image" :src="currentSongInfo.img" :alt="currentSongInfo.album" />
					<div class="song-info-main">
						<div class="song-title">「<span v-text="currentSongInfo.title"></span>」</div>
						<div class="song-album" v-text="currentSongInfo.album"></div>
					</div>
				</div>
			</div>
		</div>

		<transition name="modal-fade">
			<div class="album-detail" v-if="showAlbumDetail">
				<div class="album-detail-header">
					<figure><img :src="currentAlbumData.img" :alt="currentAlbumData.title"/></figure>
					<div class="album-title-container">
						<div class="album-sub-title" v-text="currentAlbumData.subTitle"></div>
						<div class="album-title" v-text="currentAlbumData.title"></div>
					</div>
					<div class="link">
						<a target="_blank" :href="currentAlbumData.link" title="（购买 | 購買）">購入</a>
					</div>
					<div class="close-btn" @click="showAlbumDetail=false"><i class="fas fa-times"></i></div>
				</div>
				<ol class="song-list">
					<li v-for="(item, index) in currentAlbumData.songs" :key="index">
						<div class="song-title" v-text="item"></div>
					</li>
				</ol>
				
			</div>
		</transition>
	</div>
`
});

export default MusicPlayer;
