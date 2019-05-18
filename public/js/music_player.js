import pd from "./player-data.js";
const playerData = pd.songs;
let analyser;
let frequencyData;
let gainNode = 1; // audioContext.createCain

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
      isPlay: true,
      isMute: true,
      currentSongInfo: {}
    };
  },
  computed: {},
  methods: {
    changeSong: function() {
      const currentData = playerData[this.currentPlayIndex];
      this.currentSongInfo = {
        title: currentData.title,
        album: currentData.album,
        src: currentData.src
      };
      //console.dir(this.audio);
      this.audio.src = playerData[this.currentPlayIndex].src;
      this.audio.oncanplay = () => {
        this.audio.play();
      };
      this.audio.onended = () => {
        this.currentPlayIndex++;
        if (this.currentPlayIndex > playerData.length - 1) {
          this.currentPlayIndex = 0;
        }
        this.changeSong();
      };
    },
    clickPlayBtn: function() {
      if (this.isPlay) {
        this.isPlay = false;
        this.audio.pause();
      } else {
        this.isPlay = true;
        this.audio.play();
      }
    },
    clickMuteBtn: function() {
      if (this.isMute) {
        this.isMute = false;
        gainNode.gain.value = 1;
      } else {
        this.isMute = true;
        gainNode.gain.value = 0;
      }
    },
    waveDisplay: function(audioElement, canvas) {
      const canvas_ctx = canvas.getContext("2d");
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();
      analyser = context.createAnalyser();
      analyser.fftSize = 2048;
      gainNode = context.createGain();
      const source = context.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(context.destination);

      frequencyData = new Uint8Array(analyser.frequencyBinCount);
      //render
      const render = () => {
        requestAnimationFrame(render);
        analyser.getByteFrequencyData(frequencyData);
        canvas_ctx.clearRect(0, 0, canvas.width, canvas.height);

        let ll = canvas.width;
        for (let i = 0, l = ll; i < l; i++) {
          let val = canvas.height - (canvas.height * frequencyData[i]) / 255;
          canvas_ctx.beginPath();
          canvas_ctx.moveTo(i * 2, val);
          canvas_ctx.lineTo(i * 2, canvas.height);
          let col = 360 * ((i * 2) / l);
          if (this.isMute) {
            canvas_ctx.strokeStyle = "rgba(50,50,50,.5)";
          } else {
            canvas_ctx.strokeStyle = `hsla(${col}, 50%, 50%, 0.4)`;
          }
          canvas_ctx.stroke();
          canvas_ctx.closePath();
        }
      };
      // canvas init
      canvas.height = 100;
      canvas.width = window.innerWidth;
      window.onresize = () => {
        canvas.width = window.innerWidth;
      };
      render();
    }
  },
  mounted() {
    this.canvas = this.$el.querySelector(".music-player-waver");
    //document.body.ontouchend = () => {
    this.waveDisplay(this.audio, this.canvas);

    this.isMute = true;
    gainNode.gain.value = 0;
    this.changeSong();
    setTimeout(() => {}, 10);
    //};
  },
  template: `
	<div class="music-player">
		<canvas class="music-player-waver"></canvas>
		<div class="music-player-inner">
			<div class="play-volume btn" :class="{'is-mute': isMute}" @click="clickMuteBtn"><i class="btn-mute-off fas fa-volume-mute"></i><i class="btn-mute-on fas fa-volume-up"></i><div class="tooltip">SOUND <span v-if="isMute">ON</span><span v-if="!isMute">OFF</span></div></div>
			<div class="play-btn btn" :class="{'is-play': isPlay}" @click="clickPlayBtn"><i class="btn-play fas fa-play"></i><i class="btn-pause fas fa-pause"></i></div>
			<div class="song-info">
				<div class="song-title">「<span v-text="currentSongInfo.title"></span>」</div>
				<div class="song-album" v-text="currentSongInfo.album"></div>
			</div>
		</div>
	</div>
`
});

export default MusicPlayer;
