export default defineNuxtPlugin(() => {
  const auth = useAuth()
  // If not initialized on client, fetch profile once.
  if (!auth.initialized.value) {
    auth.fetchProfile().catch(() => {
      // ignore; middleware and components handle redirects/UI
    })
  }
})
