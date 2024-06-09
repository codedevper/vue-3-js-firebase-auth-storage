<template>
  <div v-if="user">
    <h2>Welcome, {{ user.displayName }}</h2>
    <p>Email: {{ user.email }}</p>
    <p>UID: {{ user.uid }}</p>
    <p>Email Verified: {{ user.emailVerified }}</p>
    <button @click="logout">Logout</button>
  </div>
  <UpdateProfile />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '@/plugins/firebase'
import { signOut } from 'firebase/auth'
import UpdateProfile from '@/views/account/partials/UpdateProfile.vue'
import { useUserStore } from '@/stores/userStore'

const user = ref(null)

onMounted(() => {
  user.value = auth.currentUser
})

const logout = async () => {
  await signOut(auth)
  localStorage.removeItem('userProfile')
  localStorage.removeItem('isLoggedIn')
  window.location.reload(true)
}

const userStore = useUserStore()

onMounted(() => {
  userStore.loadFromLocalStorage()
  userStore.loadFromFirebaseStorage()
})
</script>
