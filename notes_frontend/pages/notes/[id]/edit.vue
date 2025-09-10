<template>
  <div class="card">
    <h2>Edit Note</h2>

    <div v-if="loading" style="margin-top:8px; color: var(--muted)">Loading...</div>
    <div v-if="error" class="error" style="margin-top:8px;">{{ error }}</div>

    <form v-if="!loading" @submit.prevent="onSubmit" style="margin-top:8px;">
      <div class="field">
        <label class="label" for="title">Title</label>
        <input id="title" v-model="title" required />
      </div>
      <div class="field">
        <label class="label" for="content">Content</label>
        <textarea id="content" v-model="content" rows="8" required />
      </div>
      <div v-if="saveError" class="error" style="margin: 8px 0;">{{ saveError }}</div>
      <div class="toolbar">
        <button class="btn" type="submit" :disabled="saving">{{ saving ? 'Saving...' : 'Save' }}</button>
        <NuxtLink class="btn secondary" :to="`/notes/${id}`">Cancel</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const api = useApi()
const router = useRouter()
const id = Number(route.params.id)

const title = ref('')
const content = ref('')
const loading = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)
const saveError = ref<string | null>(null)

async function load() {
  error.value = null
  loading.value = true
  try {
    const n = await api.getNote(id)
    title.value = n.title
    content.value = n.content
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Failed to load note'
  } finally {
    loading.value = false
  }
}

async function onSubmit() {
  saveError.value = null
  saving.value = true
  try {
    await api.updateNote(id, { title: title.value, content: content.value })
    router.push(`/notes/${id}`)
  } catch (e: any) {
    saveError.value = e?.data?.message || e?.message || 'Failed to save note'
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
