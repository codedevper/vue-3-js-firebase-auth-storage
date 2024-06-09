import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isLoggedIn: localStorage.getItem('isLoggedIn') ?? false,
    }),
    getters: {
        //
    },
    actions: {
        //
    }
})
