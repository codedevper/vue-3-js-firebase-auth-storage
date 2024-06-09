<template>
  <div>
    <h2>SignUp</h2>
    <form @submit.prevent="signUp">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">SignUp</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '@/plugins/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const signUp = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    localStorage.setItem('isLoggedIn', true)
    router.push({ name: 'account-profile' })
  } catch (error) {
    console.error('Error signup:', error)
    switch (error.code) {
      case 'auth/invalid-value-(email)':
        alert('Invalid value email address')
        break
      case 'auth/invalid-value-(password)':
        alert('Invalid value password')
        break
      case 'auth/email-already-in-use':
        alert('Email already in use')
        break
      case 'auth/invalid-email':
        alert('Invalid email address')
        break
      case 'auth/weak-password':
        alert('Password should be at least 6 characters')
        break
      default:
        alert('Invalid email address or password')
        break
    }
  }
}
</script>
