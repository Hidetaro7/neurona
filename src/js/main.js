/* instajson.then(instadata => {
  console.log(instadata);
  const instaContainer = document.querySelector(".instagram-container");
  instadata.data.forEach(item => {
    if (item.type === "video") {
      const instaItemContainer = document.createElement("div");
      instaItemContainer.className = "insta-item";
      instaItemContainer.innerHTML = `
				<div class="insta-thumbnail" style="background-image: url(${
          item.images.standard_resolution.url
        })">
					<div class="insta-title"></div>
				</div>
			`;
      instaContainer.appendChild(instaItemContainer);
    }
  });
}); */

Vue.component("insta-card", {
  props: ["myData"],
  data: function() {
    return {};
  },
  template: `
		<div class="insta-card">
		
	<video controls :src="myData.videos.low_resolution.url" :poster="myData.images.standard_resolution.url"></video>
		<div class="data-contents">
		<div class="insta-likes"><i class="fal fa-heart"></i><span>{{myData.likes.count}}</span></div>
		<a class="insta-link" :href="myData.link" target="_blank"><i class="fab fa-instagram"></i></a>
		</div>
	</div>
	
</div>

<!--<div class="insta-thumbnail" v-bind:style="{ 'background-image': 'url(' + myData.images.standard_resolution.url + ')' }"><div class="insta-title">{{myData.caption.text}}</div><div class="insta-user-fullname">{{myData.user.full_name}}</div>
<img :src="myData.user.profile_picture" :alt="myData.user.full_name">-->
`
});

/* 
<div class="insta-thumbnail" v-bind:style="{ 'background-image': 'url(' + instaData + ')' }"> */

const apps = new Vue({
  el: "#app",
  components: ["insta-card"],
  data: {
    instadata: [],
    isVideoPlay: false,
    action: "stopVideo"
  },
  created() {
    axios.post("https://tuqulore.com/neurona/json/insta.php").then(response => {
      this.instadata = response.data.data;
    });
  },
  methods: {
    changeVideoMode: function() {
      this.isVideoPlay = !this.isVideoPlay;
      this.action = this.isVideoPlay ? "playVideo" : "pauseVideo";
      this.videoControl();
    },
    videoControl: function(action) {
      // video hero image
      const videoWindow = document.querySelector(".hero-video").contentWindow;
      videoWindow.postMessage(
        '{"event":"command","func":"' + this.action + '","args":[]}',
        "*"
      );
    }
  }
});
