<template>
  <div class="card">
    <h2>Frontend Health</h2>
    <p class="label">This page renders if the frontend is running.</p>
    <ul>
      <li>Runtime API base: <code>{{ apiBase }}</code></li>
      <li>Auth initialized: <strong>{{ auth.initialized ? 'yes' : 'no' }}</strong></li>
      <li>Has token: <strong>{{ auth.token ? 'yes' : 'no' }}</strong></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const apiBase = (config.public as any).NOTES_API_BASE
const auth = useAuth()
</script>
