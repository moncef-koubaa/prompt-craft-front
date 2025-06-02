<template>
  <div class="logout-view">
    <p>Logging out...</p>
  </div>
</template>

<script>
import authService from '@/services/authService'

export default {
  async created() {
    console.log("wsilt lil logout page")
    authService.logout()
    this.$router.push({ name: 'signin' })
  }
}
</script>
