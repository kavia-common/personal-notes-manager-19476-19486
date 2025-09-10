<template>
  <div class="card">
    <h2>New Note</h2>
    <form @submit.prevent="onSubmit" style="margin-top:8px;">
      <div class="field">
        <label class="label" for="title">Title</label>
        <input id="title" v-model="title" required placeholder="e.g., Ideas for project" />
      </div>
      <div class="field">
        <label class="label" for="content">Content</label>
        <textarea id="content" v-model="content" rows="8" required placeholder="Write your thoughts..." />
      </div>
      <div v-if="error" class="error" style="margin: 8px 0;">{{ error }}</div>
      <div class="toolbar">
        <button class="btn" type="submit" :disabled="loading">{{ loading ? 'Saving...' : 'Create' }}</button>
        <NuxtLink class="btn secondary" to="/notes">Cancel</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const api = useApi()
const router = useRouter()

const title = ref('')
const content = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

async function onSubmit() {
  error.value = null
  loading.value = true
  try {
    const note = await api.createNote({ title: title.value.trim(), content: content.value })
    router.push(`/notes/${note.id}`)
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Failed to create note'
  } finally {
    loading.value = false
  }
}
</script>
