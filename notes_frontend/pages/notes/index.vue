<template>
  <div class="card">
    <div class="toolbar">
      <h2>My Notes</h2>
      <div class="spacer" />
      <NuxtLink class="btn" to="/notes/new">New</NuxtLink>
    </div>

    <div class="field" style="margin-top:8px;">
      <input v-model="q" placeholder="Search by title or content..." />
    </div>

    <div v-if="loading" style="margin-top: 8px; color: var(--muted)">Loading...</div>
    <div v-if="error" class="error" style="margin-top: 8px;">{{ error }}</div>

    <ul v-if="filteredNotes.length" style="list-style:none; padding:0; margin: 12px 0 0 0; display: grid; gap: 12px;">
      <li v-for="n in filteredNotes" :key="n.id" class="card" style="padding:12px;">
        <div class="toolbar">
          <div>
            <strong>{{ n.title }}</strong>
            <div style="color: var(--muted); font-size: .9rem;">#{{ n.id }}</div>
          </div>
          <div class="spacer" />
          <NuxtLink class="btn secondary" :to="`/notes/${n.id}`">View</NuxtLink>
          <NuxtLink class="btn secondary" :to="`/notes/${n.id}/edit`">Edit</NuxtLink>
          <button class="btn danger" @click="confirmDelete(n.id)">Delete</button>
        </div>
        <p style="white-space: pre-wrap; margin: 8px 0 0 0;">{{ n.content }}</p>
      </li>
    </ul>

    <div v-else-if="!loading && !error" style="margin-top: 8px; color: var(--muted);">
      No notes yet. Create your first one.
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi()
const auth = useAuth()
const notes = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const q = ref('')

const filteredNotes = computed(() => {
  const query = q.value.toLowerCase()
  if (!query) return notes.value
  return notes.value.filter((n) => {
    return (n.title || '').toLowerCase().includes(query) || (n.content || '').toLowerCase().includes(query)
  })
})

async function load() {
  error.value = null
  loading.value = true
  try {
    notes.value = await api.getNotes()
  } catch (e: any) {
    if (!auth.token.value) return
    error.value = e?.data?.message || e?.message || 'Failed to load notes'
  } finally {
    loading.value = false
  }
}

async function confirmDelete(id: number) {
  if (!confirm('Delete this note?')) return
  try {
    await api.deleteNote(id)
    notes.value = notes.value.filter(n => n.id !== id)
  } catch (e: any) {
    alert(e?.data?.message || e?.message || 'Failed to delete note')
  }
}

onMounted(load)
watch(() => auth.token.value, () => load())
</script>
