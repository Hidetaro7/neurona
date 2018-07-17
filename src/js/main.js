const AudioVolume = require("./modules/AudioVolume");
const AudioAnalyzer = require("./modules/AudioAnalyzer");

AudioVolume.init();

//console.log(AudioVolume.audio)

AudioAnalyzer.audio = AudioVolume.audio;
AudioAnalyzer.init();

/* $.ajax({
	url: "img/logo.svg",
	dataType: "xml",

}).done((res)=> {
	console.log(res)
	$(".p-logo-main").append(res);
}) */