<template>
  <div>
    <h2>Update Profile</h2>
    <form @submit.prevent="updateUserProfile">
      <div>
        <label for="displayName">Display Name</label>
        <input type="text" id="displayName" v-model="displayName" />
      </div>
      <div>
        <img :src="photoURL" style="height: 150px" />
        <input type="file" @change="onFileChange" />
      </div>
      <button type="submit">Update</button>
    </form>

    <form @submit.prevent="changeEmail">
      <div>
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email" />
      </div>
      <button type="submit">Update</button>
      <button type="button" @click="sendEmailVerify">Send Email Verrify</button>
    </form>

    <form @submit.prevent="changePassword">
      <div>
        <label for="newpassword">New Password</label>
        <input type="text" id="newpassword" v-model="newpassword" />
      </div>
      <button type="submit">Update</button>
      <button type="button" @click="sendEmailResetPassword">Send Email Reset Password</button>
    </form>

    <form @submit.prevent="changePhoneNumber">
      <div>
        <label for="phoneNumber">Phone Number</label>
        <input type="text" id="phoneNumber" v-model="phoneNumber" />
      </div>
      <button type="submit">Update</button>
    </form>

    <button type="button" @click="deleteAccount">Delete Account</button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { auth } from '@/plugins/firebase'
import { updateProfile, updateEmail, sendEmailVerification, updatePassword, sendPasswordResetEmail, deleteUser } from 'firebase/auth'
import { useUploadAvatarImage } from '@/composables/useUploadAvatarImage'

const userStore = useUserStore()

const file = ref(null)

const onFileChange = (event) => {
  file.value = event.target.files[0]
}

const { uploadAvatarImage } = useUploadAvatarImage()

const displayName = computed({
  get: () => userStore.displayName,
  set: (value) => {
    userStore.displayName = value
    userStore.saveToLocalStorage()
  }
})

const photoURL = computed({
  get: () => userStore.photoURL,
  set: (value) => {
    userStore.photoURL = value
    userStore.saveToLocalStorage()
  }
})

const email = computed({
  get: () => userStore.email,
  set: (value) => {
    userStore.email = value
    userStore.saveToLocalStorage()
  }
})

const phoneNumber = computed({
  get: () => userStore.phoneNumber,
  set: (value) => {
    userStore.phoneNumber = value
    userStore.saveToLocalStorage()
  }
})

const updateUserProfile = async () => {
  try {
    // Assuming you have Firebase auth logic here to update the user profile
    if (file.value) {
      photoURL.value = await uploadAvatarImage(file.value)
    }
    await updateProfile(auth.currentUser, {
      displayName: displayName.value,
      photoURL: photoURL.value
    })
    console.log('Profile updated!')
    alert('Profile updated successfully')
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Failed to update profile')
  }
}

const changeEmail = async () => {
  try {
    // Assuming you have Firebase auth logic here to update the user profile
    await updateEmail(auth.currentUser, email.value)
    console.log('Email updated!')
    alert('Email updated successfully')
  } catch (error) {
    console.error('Error updating email:', error)
    alert('Please verify the new email before changing email.')
  }
}

const sendEmailResetPassword = async () => {
  try {
    // Assuming you have Firebase auth logic here to update the user profile
    await sendPasswordResetEmail(auth.currentUser, email.value)
    console.log('Email reset password sent!')
    alert('Email send successfully')
  } catch (error) {
    console.error('Error send email:', error)
    alert('Failed to send email')
  }
}

const newpassword = ref('')
const changePassword = async () => {
  try {
    // Assuming you have Firebase auth logic here to update the user profile
    await updatePassword(auth.currentUser, newpassword.value)
    console.log('Password updated!')
    alert('Password updated successfully')
  } catch (error) {
    console.error('Error updating password:', error)
    alert('Please re signin again to change password')
  }
}

const sendEmailVerify = async () => {
  try {
    // Assuming you have Firebase auth logic here to update the user profile
    await sendEmailVerification(auth.currentUser)
    console.log('Email verification sent!')
    alert('Email verification send successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    alert('Failed to send email verification')
  }
}

const deleteAccount = async () => {
  try {
    // Assuming you have Firebase auth logic here to update the user profile
    await deleteUser(auth.currentUser)
    console.log('User deleted.!')
    alert('Account deleted.')
  } catch (error) {
    console.error('Error delete user:', error)
    alert('Failed to delete account')
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
