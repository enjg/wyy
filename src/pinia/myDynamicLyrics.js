import { defineStore } from "pinia";
import { ref } from "vue";

export const useDynamicLyrics = defineStore("counter", () => {
    let PlayState = ref(false);
    let PlaybackProgress = ref(null);
    let CurrentProgress = ref(null);

    return {
        PlayState,
        PlaybackProgress,
        CurrentProgress
    }

})