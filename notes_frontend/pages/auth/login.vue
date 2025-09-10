<template>
  <div class="card" style="max-width: 480px; margin: 0 auto;">
    <h2>Login</h2>
    <p class="label">Enter your credentials to continue.</p>

    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="label" for="email">Email</label>
        <input id="email" v-model="email" type="email" required placeholder="you@example.com" />
      </div>
      <div class="field">
        <label class="label" for="password">Password</label>
        <input id="password" v-model="password" type="password" required placeholder="••••••••" />
      </div>

      <div v-if="error" class="error" style="margin: 8px 0;">{{ error }}</div>

      <div class="toolbar" style="margin-top: 8px;">
        <button class="btn" type="submit" :disabled="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
        <NuxtLink to="/auth/signup" class="btn secondary">Create an account</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function onSubmit() {
  error.value = null
  loading.value = true
  try {
    await auth.login(email.value.trim(), password.value)
    router.push('/notes')
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
