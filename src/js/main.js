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
<div class="insta-thumbnail" v-bind:style="{ 'background-image': 'url(' + myData.id + ')' }">
		<div class="insta-title">{{myData.id}}</div>
	</div>
	
</div>
`,
  mounted() {
    //console.log(this.mydata);
  }
});

/* 
<div class="insta-thumbnail" v-bind:style="{ 'background-image': 'url(' + instaData + ')' }"> */

const apps = new Vue({
  el: "#app",
  components: ["insta-card"],
  data: {
    instadata: []
  },
  created() {
    axios.get("https://tuqulore.com/neurona/json/insta.php").then(response => {
      this.instadata = response;

      console.log(response);
    });
    /* instajson.then(instadata => {
			this.instadata = instadata;
			console.log(instadata);
			this.createInstaCard();
		}); */
  },
  methods: {
    createInstaCard: function() {
      //console.log(this.instadata.data);
    }
  }
});
