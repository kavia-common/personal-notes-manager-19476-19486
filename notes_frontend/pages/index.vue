<template>
  <div class="card">
    <h1>Welcome to Notes</h1>
    <p style="color: var(--muted);">
      Securely create, view, edit, and delete your personal notes.
    </p>
    <div class="toolbar" style="margin-top: 12px;">
      <NuxtLink class="btn" to="/notes">Go to My Notes</NuxtLink>
      <NuxtLink class="btn secondary" to="/auth/login">Login</NuxtLink>
      <NuxtLink class="btn secondary" to="/auth/signup">Create an account</NuxtLink>
    </div>
    <div style="margin-top: 16px; color: var(--muted); font-size: 0.95rem;">
      Backend API base: <code>{{ apiBase }}</code>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const apiBase = (config.public as any).NOTES_API_BASE
</script>
