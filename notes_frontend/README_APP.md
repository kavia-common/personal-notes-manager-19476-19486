# Notes Frontend (Nuxt 3)

This is the Nuxt 3 frontend for the Personal Notes application. It provides:
- Authentication: Login, Signup, Logout
- Notes CRUD: List, View, Create, Edit, Delete
- Profile view

## Environment

Set the backend API base via environment:

- NOTES_API_BASE: URL to the notes_backend (e.g., http://localhost:3001)

You can create a .env file with:
```
NOTES_API_BASE=http://localhost:3001
```

## Run

- Install: npm install
- Dev: NOTES_API_BASE=http://localhost:3001 npm run dev
- Build: NOTES_API_BASE=http://localhost:3001 npm run build
- Preview: npm run preview

## Structure

- composables/useAuth.ts: Token management and user profile fetch
- composables/useApi.ts: API calls for notes
- middleware/auth.global.ts: Redirects unauthenticated users from protected routes
- pages/auth/*: Auth pages
- pages/notes/*: Notes CRUD pages
- pages/profile.vue: User profile
- layouts/default.vue: Navigation and layout
