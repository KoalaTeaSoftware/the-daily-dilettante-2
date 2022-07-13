// this file does little more than actually define the data structure for the user state
// an object of this kind is actually created when the user identity component is initially mounted.

import {defineStore} from "pinia";

export const useUserState = defineStore('UserState', {
    state: () => {
        return {
            loggedInFlag: false,
            editorFlag: false
        }
    }
})