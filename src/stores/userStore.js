import { defineStore } from 'pinia';
import { auth } from "@/plugins/firebase";

export const useUserStore = defineStore('user', {
    state: () => ({
        displayName: '',
        photoURL: '',
        email: '',
        phoneNumber: '',
        uid: '',
        emailVerified: '',
    }),
    actions: {
        setUserProfile(profile) {
            this.displayName = profile.displayName;
            this.photoURL = profile.photoURL;
            this.email = profile.email;
            this.phoneNumber = profile.phoneNumber;
            this.saveToLocalStorage();
        },
        loadFromFirebaseStorage() {
            const user = auth.currentUser;
            if (user) {
                const { displayName, photoURL, email, phoneNumber, uid, emailVerified } = user;
                this.displayName = displayName;
                this.photoURL = photoURL;
                this.email = email;
                this.phoneNumber = phoneNumber;
                this.uid = uid;
                this.emailVerified = emailVerified;
            }
        },
        loadFromLocalStorage() {
            const storedProfile = localStorage.getItem('userProfile');
            if (storedProfile) {
                const { displayName, photoURL, email, phoneNumber } = JSON.parse(storedProfile);
                this.displayName = displayName;
                this.photoURL = photoURL;
                this.email = email;
                this.phoneNumber = phoneNumber;
            }
        },
        saveToLocalStorage() {
            const userProfile = {
                displayName: this.displayName,
                photoURL: this.photoURL,
                email: this.email,
                phoneNumber: this.phoneNumber,
            };
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
        },
    },
});
