let AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false; 
const ctx = new AudioContext();
let audioElement;
let audioSrc;
let analyser;
let gainNode;
let frequencyData;
let canvas, canvas_ctx;
let isMute = true;


class AudioAnalyzer {
    constructor() {}

    static init () {
        canvas = document.getElementById("spectrum");
        canvas.width = 730 * 2;
        canvas.height = 200;
        canvas_ctx = canvas.getContext("2d");
				audioSrc = ctx.createMediaElementSource(audioElement);
				analyser = ctx.createAnalyser();
				gainNode = ctx.createGain();
        // we have to connect the MediaElementSource with the analyser 
				audioSrc.connect(analyser);
				audioSrc.connect(gainNode);
        gainNode.connect(ctx.destination);
        // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
        // frequencyBinCount tells you how many values you'll receive from the analyser
        frequencyData = new Uint8Array(analyser.frequencyBinCount);
        
        // we're ready to receive some data!
        // loop
        function renderFrame() {
            requestAnimationFrame(renderFrame);
            // update data in frequencyData
            analyser.getByteFrequencyData(frequencyData);
            // render frame based on values in frequencyData
            //console.log(frequencyData)
            
            canvas_ctx.clearRect(0,0,canvas.width, canvas.height);
            
            let ll = canvas.width;
            for (let i = 0, l = ll; i < l; i++) {
                //if(i%2 === 0) {
                    let val = canvas.height - canvas.height * frequencyData[i]/255;
                    canvas_ctx.beginPath();
                    canvas_ctx.moveTo(i*2, val);
                    canvas_ctx.lineTo(i*2, canvas.height);
                    /* if(i > 700) {
                        canvas_ctx.strokeStyle = "rgba(255, 0, 0, 0.6)";
                    } */
										let col = 360 * (i*2 / l);
										if(isMute) {
											canvas_ctx.strokeStyle = 'rgba(50,50,50,.5)';
										}else{
											canvas_ctx.strokeStyle = `hsla(${col}, 50%, 50%, 0.9)`;
										}
                    canvas_ctx.stroke();
                    canvas_ctx.closePath();
                //}
            }
        }
        renderFrame();
		}
		
		static set volume (_v) {
			//console.log(_v)
			gainNode.gain.setValueAtTime(_v, ctx.currentTime);
		}
		static get volume () {
			return gainNode.gain.value;
		}
    static set audio (_ele) {
        audioElement = _ele;
    }
    static get audio () {
        return audioElement;
    }
    static start () {
        audioElement.start();
    }
    static set mute (_flg) {
			isMute = _flg;
    }
    static get mute () {
        return isMute;
    }
}

module.exports = AudioAnalyzer;