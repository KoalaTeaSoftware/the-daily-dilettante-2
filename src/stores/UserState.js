import {defineStore} from "pinia";

export const useUserState = defineStore('UserState', {
    state: () => {
        return {
            amLoggedIn: false,
            amEditor: false
        }
    }
})