
const AudioAnalyzer = require("./AudioAnalyzer");

let _volume = 0.2;
let is_muted = true;
let offsetLeft = 0;
let audio;

class AudioVolume {
    constructor () {
        this.p;
		}
		static set muted (_mute) {
			is_muted = _mute;
			//console.log(is_muted)
			if(is_muted) {
				AudioAnalyzer.volume = 0;
				AudioAnalyzer.mute = true;
				$("body").addClass("is-muted")
				audio.pause()
			}else{
				AudioAnalyzer.volume = parseFloat(_volume);
				AudioAnalyzer.mute = false;
				$("body").removeClass("is-muted")
				audio.play()
			}
		}
		static get muted() {
			return is_muted;
		}
    static init () {
        audio = new Audio();
        audio.src = "./audio/samples.mp3";
        audio.oncanplay = function () {
					//AudioAnalyzer.volume = 0;
					//AudioVolume.muted = true;
					//audio.play();
					$(".p-visualizer").addClass("is-sound-loaded")
				}
				audio.ontimeupdate = () => {
					$(".c-progress__bar").css({width: (audio.currentTime / audio.duration * 100) + "%"})
				}
        $(".c-audio__mute").on("click", (e) => {
				//	AudioVolume.muted != AudioVolume.muted;
					//console.log(AudioVolume.muted)
						$(e.currentTarget).toggleClass("is-muting");
						let ismute = $(e.currentTarget).hasClass("is-muting");
						AudioVolume.muted = ismute ? true: false;
        })
        $(".c-audio__volume__range").on("input", (e) => {
						_volume = e.target.value / 100;
						if(!is_muted) {
							AudioAnalyzer.volume = parseFloat(_volume);
						}
        })
    }
    static update () {
    }

    static get audio () {
        return audio;
    }
}

module.exports = AudioVolume;