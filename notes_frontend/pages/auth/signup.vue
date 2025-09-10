<template>
  <div class="card" style="max-width: 520px; margin: 0 auto;">
    <h2>Create account</h2>
    <p class="label">Start capturing your ideas.</p>

    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="label" for="name">Name</label>
        <input id="name" v-model="name" type="text" placeholder="Your name" />
      </div>

      <div class="field">
        <label class="label" for="email">Email</label>
        <input id="email" v-model="email" type="email" required placeholder="you@example.com" />
      </div>

      <div class="field">
        <label class="label" for="password">Password</label>
        <input id="password" v-model="password" type="password" minlength="6" required placeholder="At least 6 characters" />
      </div>

      <div v-if="error" class="error" style="margin: 8px 0;">{{ error }}</div>
      <div v-if="success" class="success" style="margin: 8px 0;">{{ success }}</div>

      <div class="toolbar" style="margin-top: 8px;">
        <button class="btn" type="submit" :disabled="loading">{{ loading ? 'Creating...' : 'Sign up' }}</button>
        <NuxtLink class="btn secondary" to="/auth/login">Have an account? Login</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const success = ref<string | null>(null)
const loading = ref(false)

async function onSubmit() {
  error.value = null
  success.value = null
  loading.value = true
  try {
    await auth.signup(name.value.trim(), email.value.trim(), password.value)
    success.value = 'Account created!'
    router.push('/notes')
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Signup failed'
  } finally {
    loading.value = false
  }
}
</script>
