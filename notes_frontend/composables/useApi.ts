type Note = {
  id: number
  title: string
  content: string
  created_at?: string
  updated_at?: string
}

type NoteInput = {
  title: string
  content: string
}

// PUBLIC_INTERFACE
export function useApi() {
  /** Provides typed API calls for notes and user profile using the backend REST API. */
  const config = useRuntimeConfig()
  const apiBase = (config.public as any).NOTES_API_BASE as string
  const { authHeader } = useAuth()

  async function getNotes(): Promise<Note[]> {
    return await $fetch<Note[]>(`${apiBase}/notes`, {
      headers: { ...authHeader() }
    })
  }

  async function getNote(id: number): Promise<Note> {
    return await $fetch<Note>(`${apiBase}/notes/${id}`, {
      headers: { ...authHeader() }
    })
  }

  async function createNote(input: NoteInput): Promise<Note> {
    return await $fetch<Note>(`${apiBase}/notes`, {
      method: 'POST',
      body: input,
      headers: { ...authHeader() }
    })
  }

  async function updateNote(id: number, input: Partial<NoteInput>): Promise<Note> {
    return await $fetch<Note>(`${apiBase}/notes/${id}`, {
      method: 'PUT',
      body: input,
      headers: { ...authHeader() }
    })
  }

  async function deleteNote(id: number): Promise<void> {
    await $fetch(`${apiBase}/notes/${id}`, {
      method: 'DELETE',
      headers: { ...authHeader() }
    })
  }

  return { getNotes, getNote, createNote, updateNote, deleteNote }
}
