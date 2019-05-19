const songData = {
  songs: [
    {
      category: "5th",
      title: "ヒロインなんて大嫌い",
      album: "放出！アイデンティティ",
      src: "audio/5th/01_heroine.m4a",
      img: "./img/jacket-5th.jpg"
    },
    {
      category: "5th",
      title: "バタフライ",
      album: "放出！アイデンティティ",
      src: "audio/5th/02_butterfly.m4a",
      img: "./img/jacket-5th.jpg"
    },
    {
      category: "5th",
      title: "空と海と猫のワルツ",
      album: "放出！アイデンティティ",
      src: "audio/5th/03_neko_waltz.m4a",
      img: "./img/jacket-5th.jpg"
    },
    {
      category: "5th",
      title: "ピジョン夢物語",
      album: "放出！アイデンティティ",
      src: "audio/5th/04_pigeon_yume.m4a",
      img: "./img/jacket-5th.jpg"
    },
    {
      category: "5th",
      title: "ラスボスはもうひとりの君",
      album: "放出！アイデンティティ",
      src: "audio/5th/05_lastboss.m4a",
      img: "./img/jacket-5th.jpg"
    },
    {
      category: "5th",
      title: "ほとりの声",
      album: "放出！アイデンティティ",
      src: "audio/5th/06_hotorino_koe.m4a",
      img: "./img/jacket-5th.jpg"
    },
    {
      category: "4th",
      title: "ハナビライフル",
      album: "玉虫色ライオット",
      src: "audio/4th/01_hanabira.m4a",
      img: "./img/jacket-4th.jpg"
    },
    {
      category: "4th",
      title: "夏空のドゥーワップ",
      album: "玉虫色ライオット",
      src: "audio/4th/02_doo-wop.m4a",
      img: "./img/jacket-4th.jpg"
    },
    {
      category: "4th",
      title: "Cry",
      album: "玉虫色ライオット",
      src: "audio/4th/03_cry.m4a",
      img: "./img/jacket-4th.jpg"
    },
    {
      category: "4th",
      title: "サイレンス",
      album: "玉虫色ライオット",
      src: "audio/4th/04_silence.m4a",
      img: "./img/jacket-4th.jpg"
    },
    {
      category: "4th",
      title: "Wednesday Valentine",
      album: "玉虫色ライオット",
      src: "audio/4th/05_wednesday_v.m4a",
      img: "./img/jacket-4th.jpg"
    },
    {
      category: "4th",
      title: "サイのツノのように",
      album: "玉虫色ライオット",
      src: "audio/4th/06_sai.m4a",
      img: "./img/jacket-4th.jpg"
    },
    {
      category: "4th",
      title: "きみがきみのために",
      album: "玉虫色ライオット",
      src: "audio/4th/07_kimikimi.m4a",
      img: "./img/jacket-4th.jpg"
    },
    {
      category: "1st-single",
      title: "サイのツノのように",
      album: "サイのツノのように",
      src: "audio/1st_single/sai.m4a",
      img: "./img/jacket_1st-single.jpg"
    },
    {
      category: "3rd",
      title: "BOMB!",
      album: "空蝉ーUtsusemiー",
      src: "audio/3rd/01_bomb.m4a",
      img: "./img/jacket-3rd.jpg"
    },
    {
      category: "3rd",
      title: "Naturally（2018）",
      album: "空蝉ーUtsusemiー",
      src: "audio/3rd/02_naturally.m4a",
      img: "./img/jacket-3rd.jpg"
    },
    {
      category: "3rd",
      title: "So Sweet",
      album: "空蝉ーUtsusemiー",
      src: "audio/3rd/03_so_sweet.m4a",
      img: "./img/jacket-3rd.jpg"
    },
    {
      category: "3rd",
      title: "四足のヒーロー（2018）",
      album: "空蝉ーUtsusemiー",
      src: "audio/3rd/04_4soku.m4a",
      img: "./img/jacket-3rd.jpg"
    },
    {
      category: "3rd",
      title: "水蜜桃",
      album: "空蝉ーUtsusemiー",
      src: "audio/3rd/05_suimitutou.m4a",
      img: "./img/jacket-3rd.jpg"
    },
    {
      category: "3rd",
      title: "Hello Halo（未完成）",
      album: "空蝉ーUtsusemiー",
      src: "audio/3rd/06_hello.m4a",
      img: "./img/jacket-3rd.jpg"
    },
    {
      category: "2nd",
      title: "Promise",
      album: "ナガスギタ春",
      src: "audio/2nd/01_promise.m4a",
      img: "./img/jacket-2nd_s.jpg"
    },
    {
      category: "2nd",
      title: "Strange Day",
      album: "ナガスギタ春",
      src: "audio/2nd/02_strangeday.m4a",
      img: "./img/jacket-2nd_s.jpg"
    },
    {
      category: "2nd",
      title: "DROPS",
      album: "ナガスギタ春",
      src: "audio/2nd/03_drops.m4a",
      img: "./img/jacket-2nd_s.jpg"
    },
    {
      category: "2nd",
      title: "FRIEND",
      album: "ナガスギタ春",
      src: "audio/2nd/04_friend.m4a",
      img: "./img/jacket-2nd_s.jpg"
    },
    {
      category: "2nd",
      title: "幾千一夜",
      album: "ナガスギタ春",
      src: "audio/2nd/05_ikusen.m4a",
      img: "./img/jacket-2nd_s.jpg"
    },
    {
      category: "2nd",
      title: "チケット",
      album: "ナガスギタ春",
      src: "audio/2nd/06_ticket.m4a",
      img: "./img/jacket-2nd_s.jpg"
    },
    {
      category: "1st",
      title: "四足のヒーロー",
      album: "突き放すよ、これが愛だ君への愛だ",
      src: "audio/1st/01_4soku.m4a",
      img: "./img/jacket-1st.jpg"
    },
    {
      category: "1st",
      title: "Naturally",
      album: "突き放すよ、これが愛だ君への愛だ",
      src: "audio/1st/02_naturally.m4a",
      img: "./img/jacket-1st.jpg"
    },
    {
      category: "1st",
      title: "ラバソニっ！",
      album: "突き放すよ、これが愛だ君への愛だ",
      src: "audio/1st/03_loversonic.m4a",
      img: "./img/jacket-1st.jpg"
    },
    {
      category: "1st",
      title: "サイレンス",
      album: "突き放すよ、これが愛だ君への愛だ",
      src: "audio/1st/04_silence.m4a",
      img: "./img/jacket-1st.jpg"
    },
    {
      category: "1st",
      title: "1000年のタイマー",
      album: "突き放すよ、これが愛だ君への愛だ",
      src: "audio/1st/05_timer.m4a",
      img: "./img/jacket-1st.jpg"
    }
  ]
};

export default songData;
