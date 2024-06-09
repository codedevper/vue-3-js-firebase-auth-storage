<template>
  <div>
    <h2>SignIn</h2>
    <form @submit.prevent="signIn">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">SignIn</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '@/plugins/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const signIn = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    localStorage.setItem('isLoggedIn', true)
    router.push({ name: 'account-profile' })
  } catch (error) {
    console.error('Error signin:', error)
    switch (error.code) {
      case 'auth/invalid-value-(email)':
        alert('Invalid value email address')
        break
      case 'auth/invalid-value-(password)':
        alert('Invalid value password')
        break
      case 'auth/invalid-credential':
        alert('Invalid login credentials')
        break
      default:
        alert('Invalid email address or password')
        break
    }
  }
}
</script>
