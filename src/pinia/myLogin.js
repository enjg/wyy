import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useLoginStore = defineStore("counter", () => {
    let cookie=ref();
    let LoginStatus=reactive({})
    function postCookie(center){
        cookie.value=center;
    }
    function postLoginStatus(center){
        LoginStatus=center;
        console.log(LoginStatus)
    }
    return{
        cookie,
        LoginStatus,
        postCookie,
        postLoginStatus,
    }
    
})