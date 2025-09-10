export default defineNuxtRouteMiddleware((to) => {
  // Public routes
  const publicPaths = ['/auth/login', '/auth/signup', '/']
  const isPublic = publicPaths.includes(to.path)

  const auth = useAuth()

  // Avoid redirect loops and allow initial client hydration to fetch profile
  if (!auth.initialized.value) return

  if (!isPublic && !auth.token.value) {
    return navigateTo('/auth/login')
  }
})
