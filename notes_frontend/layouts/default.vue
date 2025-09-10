<template>
  <div>
    <header class="card" style="border-radius:0;">
      <div class="container" style="display:flex; gap:12px; align-items:center;">
        <NuxtLink to="/" style="font-weight:800; font-size: 1.1rem;">🗒️ Notes</NuxtLink>
        <nav style="display:flex; gap:10px;">
          <NuxtLink to="/notes">My Notes</NuxtLink>
          <NuxtLink to="/notes/new">New Note</NuxtLink>
          <NuxtLink to="/profile">Profile</NuxtLink>
        </nav>
        <div class="spacer" />
        <template v-if="auth.user">
          <span style="color: var(--muted); font-size: .95rem;">Hi, {{ auth.user.name || auth.user.email }}</span>
          <button class="btn secondary" @click="goToProfile">Profile</button>
          <button class="btn danger" @click="handleLogout">Logout</button>
        </template>
        <template v-else>
          <NuxtLink class="btn gray" to="/auth/login">Login</NuxtLink>
          <NuxtLink class="btn" to="/auth/signup">Sign up</NuxtLink>
        </template>
      </div>
    </header>
    <AppLoading />
    <main class="container" style="margin-top:16px;">
      <slot />
    </main>
    <footer class="container" style="margin: 24px auto; color: var(--muted); font-size: 0.9rem;">
      Built with Nuxt 3
    </footer>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/auth/login')
}
function goToProfile() {
  router.push('/profile')
}
</script>
