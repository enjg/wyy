import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useLoginStore = defineStore("counter", () => {
    let cookie = ref(null);
    let LogInTF = ref(0);
    let LoginStatus = reactive({})
    function postCookie(center) {
        cookie.value = center;
    }
    function postLoginStatus(center) {
        Object.assign(LoginStatus, center)
        console.log(LoginStatus)
    }
    return {
        cookie,
        LoginStatus,
        LogInTF,
        postCookie,
        postLoginStatus,
    }

})