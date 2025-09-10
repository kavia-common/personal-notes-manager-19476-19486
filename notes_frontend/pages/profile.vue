<template>
  <div class="card">
    <div class="toolbar">
      <h2>Profile</h2>
      <div class="spacer" />
      <button class="btn secondary" @click="refresh">Refresh</button>
      <button class="btn danger" @click="logout">Logout</button>
    </div>

    <div v-if="!auth.user" style="margin-top: 8px; color: var(--muted);">
      Not logged in.
    </div>

    <div v-else style="margin-top: 8px;">
      <div class="field">
        <div class="label">Name</div>
        <div>{{ auth.user.name || '—' }}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div>{{ auth.user.email }}</div>
      </div>
      <div class="field">
        <div class="label">Token present</div>
        <div>{{ auth.token ? 'Yes' : 'No' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()

async function refresh() {
  await auth.fetchProfile()
}

function logout() {
  auth.logout()
  navigateTo('/auth/login')
}
</script>
