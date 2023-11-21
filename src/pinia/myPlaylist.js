import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";

export const useMyPlaylist = defineStore("myPlaylist", () => {
    let PlaybackHistory = reactive([]);
    let playlistArray = reactive([]);
    let playlistContent = reactive([]);
    let PrivateFw = reactive([]);
    let index = ref(null)
    let volume = ref(0.5);
    let ToneQuality = reactive({
        name: '标准',
        argument: 'standard'
    });
    function checkIdUniqueness(arr, obj) {
        const id = obj.id;
        if (!arr.some((item) => item.conent.id === id)) {
            const timestamp = new Date().getTime();

            PlaybackHistory.push({
                conent: obj,
                time: timestamp,
            });
            console.log(PlaybackHistory)
        }
    }


    watch(() => index.value, (newValue) => {
        playlistContent.length = 0;
        ToneQuality.name = '标准';
        ToneQuality.argument = 'standard';
        if (playlistArray.length) {
            playlistContent.push(playlistArray[newValue]);
        } else if (PrivateFw.length) {
            playlistContent.push(PrivateFw[newValue]);
        }
    })

    watch(() => playlistContent[0], () => {
        checkIdUniqueness(PlaybackHistory, playlistContent[0]);
    }, { deep: true })


    function postPlaylistArray(center) {
        playlistArray.length = 0;
        playlistArray.push(...center)
        console.log(center)
    }
    function postPlaylistContent(center) {
        // playlistContent.length = 0;
        // playlistContent.push(center);
        console.log(center);
    }
    function PlaylistIndex(center) {
        index.value = center;
        console.log(center);
    }
    function PlaylistCutSong(center) {
        if (center === 1) {
            index.value -= 1;
        } else {
            index.value += 1;
        }
    }
    function hasObject(array, target) {
        return array.some(item => JSON.stringify(item) === JSON.stringify(target));
    }
    function moveObjectToIndex(array, target, index) {
        const currentIndex = array.findIndex(obj => obj.id === target.id);
        if (currentIndex !== -1) {
            const objectToMove = array.splice(currentIndex, 1)[0];
            array.splice(index + 1, 0, objectToMove);
            return array.findIndex(obj => obj.id === target.id); // 返回移动后的索引位置
        }
    }

    function postPlaylistArrayPush(center) {
        console.log(center)
        if (playlistArray.length !== 0) {
            if (!hasObject(playlistArray, center)) {
                playlistArray.splice(index.value + 1, 0, center);
                PlaylistCutSong(2);
            } else if (center.id !== playlistContent[0].id) {
                index.value = moveObjectToIndex(playlistArray, center, index.value)
                playlistContent.length = 0;
                playlistContent.push(center);
            }

        } else if (playlistArray.length === 0) {
            playlistArray.push(center)
            playlistContent.push(center)
            index.value = 0;
            // postPlaylistContent(center);
            // PlaylistIndex(0);
        }
    }
    return {
        playlistArray,
        playlistContent,
        PlaybackHistory,
        postPlaylistArray,
        postPlaylistContent,
        index,
        PlaylistIndex,
        PlaylistCutSong,
        postPlaylistArrayPush,
        volume,
        ToneQuality
    }

})