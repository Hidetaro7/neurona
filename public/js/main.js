import MusicPlayer from "./music_player.js";

const releaseData = {
  releases: [
    {
      sub: "5th Mini Album（2019）",
      title: "放出！アイデンティティ",
      imgPath: "./img/jacket-5th.jpg",
      isNew: true,
      link: "#"
    },
    {
      sub: "4th Mini Album（2018）",
      title: "玉虫色ライオット",
      imgPath: "./img/jacket-4th.jpg",
      link: "https://linkco.re/ZQCHur7q"
    },
    {
      sub: "1st Single（2018）",
      title: "サイのツノのように",
      imgPath: "./img/jacket_1st-single.jpg",
      link: "https://linkco.re/srvAAPb8"
    },
    {
      sub: "3rd Mini Album（2018）",
      title: "空蝉〜Utsusemi〜",
      imgPath: "./img/jacket-3rd.jpg",
      link: "https://linkco.re/sR81T1EB"
    },
    {
      sub: "2nd Mini Album（2018）",
      title: "ナガスギタ春",
      imgPath: "./img/jacket-2nd_s.jpg",
      link: "https://linkco.re/Pc39XsmS"
    },
    {
      sub: "1st Mini Album（2017）",
      title: "突き放すよ、これが愛だ君への愛だ",
      imgPath: "./img/jacket-1st.jpg",
      link: "https://linkco.re/z0SP1eVB"
    }
  ]
};

const releaseCard = Vue.component("release-card", {
  props: {
    itemData: {
      type: Object
    }
  },
  data: function() {
    return {};
  },
  computed: {},
  methods: {},
  template: `
	<a :href="itemData.link" class="release-card" target="_blank"><figure><img :src="itemData.imgPath" alt=""></figure> <div class="related-data"><div class="is-new" v-if="itemData.isNew">NEW</div><div class="sub-title" v-text="itemData.sub"></div> <div class="title" v-text="itemData.title"></div></div></a>
`
});
Vue.use(VueAwesomeSwiper);
const apps = new Vue({
  el: "#app",
  components: {
    "release-card": releaseCard,
    LocalSwiper: VueAwesomeSwiper.swiper,
    LocalSlide: VueAwesomeSwiper.swiperSlide,
    "music-player": MusicPlayer
  },
  data: {
    releaseData: releaseData,
    showDrawer: false,
    swiperOptionA: {
      pagination: {
        el: ".swiper-pagination"
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints: {
        2048: {
          slidesPerView: 4,
          spaceBetween: 40
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        460: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      },
      loop: true,
      autoplay: true
    }
  },
  created() {},
  methods: {
    onSetTranslate() {}
  },
  watch: {},
  computed: {
    swiperA() {
      return this.$refs.awesomeSwiperA.swiper;
    }
  }
});
