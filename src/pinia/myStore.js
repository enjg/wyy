import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useMyStore = defineStore("myStore", () => {
  const state = reactive({
    songurl: {
      id: "",
      img: "",
      songname: "",
      name: ""
    }
  });


  function setMessage(data) {
    state.songurl.id = data.id;
    state.songurl.img = data.img;
    state.songurl.songname = data.songname;
    state.songurl.name = data.name;
  }

  return {
    state,
    setMessage
  };
});

export const useMySong = defineStore("mySong", () => {
  const state = reactive({
    songBackdrop: {
      tf: -1,
      id: 0,
      playbacktf: false,
      playtime: ""
    },
    Lyrics: {
      tf: -1,
    }
  });

  function setId(id) {
    state.songBackdrop.id = id;
  }
  function LyricsTf() {
    state.Lyrics.tf *= -1;
    console.log(state.Lyrics.tf);
  }
  function setTf() {
    state.songBackdrop.tf *= -1;
    console.log(state.songBackdrop.tf)
  }

  function setPlaytime(playtime) {
    state.songBackdrop.playtime = playtime;
  }

  function setPlaytf(playtf) {
    state.songBackdrop.playbacktf = playtf;
    console.log(playtf)
  }

  return {
    state,
    setId,
    setTf,
    setPlaytime,
    setPlaytf,
    LyricsTf,
  };
});

export const useMysinger = defineStore("Mysinger", () => {
  const id = ref("")
  function updatedsinger(abc) {
    id.value = abc;
    console.log(id);
  }

  function abcobj() {
    console.log(999)
  }
  return {
    id,
    updatedsinger,
    abcobj,
  };
});