type User = {
  id?: number
  email: string
  name?: string
}

type LoginResponse = {
  token: string
}

const TOKEN_KEY = 'notes_token'
const USER_KEY = 'notes_user'

// PUBLIC_INTERFACE
export function useAuth() {
  /** Provides authentication state and helpers (login/signup/logout/getters). */
  const state = useState<{
    token: string | null
    user: User | null
    initialized: boolean
  }>('auth', () => {
    // Avoid direct localStorage reads during SSR
    const initial = {
      token: null as string | null,
      user: null as User | null,
      initialized: false
    }
    if (process.client) {
      try {
        initial.token = localStorage.getItem(TOKEN_KEY)
        const raw = localStorage.getItem(USER_KEY)
        initial.user = raw ? JSON.parse(raw) : null
      } catch {
        // ignore parse/storage errors
      }
    }
    return initial
  })

  const config = useRuntimeConfig()
  const apiBase = (config.public as any).NOTES_API_BASE as string

  function saveAuth(token: string | null, user: User | null) {
    state.value.token = token
    state.value.user = user
    if (process.client) {
      if (token) localStorage.setItem(TOKEN_KEY, token)
      else localStorage.removeItem(TOKEN_KEY)
      if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
      else localStorage.removeItem(USER_KEY)
    }
  }

  async function fetchProfile(): Promise<User | null> {
    if (!state.value.token) return null
    try {
      const res = await $fetch<User>(`${apiBase}/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state.value.token}`,
        }
      })
      saveAuth(state.value.token, res)
      return res
    } catch {
      // token invalid, clean up
      saveAuth(null, null)
      return null
    } finally {
      state.value.initialized = true
    }
  }

  // Initialize profile once on client mount
  if (process.client && !state.value.initialized) {
    fetchProfile()
  }

  async function login(email: string, password: string): Promise<void> {
    const res = await $fetch<LoginResponse>(`${apiBase}/auth/login`, {
      method: 'POST',
      body: { email, password }
    })
    const token = res.token
    saveAuth(token, state.value.user)
    await fetchProfile()
  }

  async function signup(name: string, email: string, password: string): Promise<void> {
    await $fetch(`${apiBase}/auth/register`, {
      method: 'POST',
      body: { name, email, password }
    })
    // After successful signup, auto-login for better UX
    await login(email, password)
  }

  function logout() {
    saveAuth(null, null)
  }

  // PUBLIC_INTERFACE
  function authHeader(): Record<string, string> {
    return state.value.token ? { Authorization: `Bearer ${state.value.token}` } : {}
  }

  // PUBLIC_INTERFACE
  function requireAuth(): Ref<boolean> {
    // To be used for route guards or UI decisions
    return computed(() => !!state.value.token)
  }

  return {
    token: computed(() => state.value.token),
    user: computed(() => state.value.user),
    initialized: computed(() => state.value.initialized),
    login,
    signup,
    logout,
    fetchProfile,
    authHeader,
    requireAuth
  }
}
