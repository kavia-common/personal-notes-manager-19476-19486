<template>
  <div class="card">
    <div class="toolbar">
      <h2>{{ note?.title }}</h2>
      <div class="spacer" />
      <NuxtLink class="btn secondary" :to="`/notes/${id}/edit`">Edit</NuxtLink>
      <NuxtLink class="btn secondary" to="/notes">Back</NuxtLink>
    </div>

    <div v-if="loading" style="margin-top:8px; color: var(--muted)">Loading...</div>
    <div v-if="error" class="error" style="margin-top:8px;">{{ error }}</div>

    <pre v-if="note" style="white-space: pre-wrap; font-family: inherit; background: #0b1020; padding: 12px; border-radius: 8px; border: 1px solid #1f2937;">{{ note.content }}</pre>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const api = useApi()
const id = Number(route.params.id)
const note = ref<any | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

async function load() {
  error.value = null
  loading.value = true
  try {
    note.value = await api.getNote(id)
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Failed to load note'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
