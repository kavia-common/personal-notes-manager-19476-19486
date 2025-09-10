export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Notes App',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal notes with authentication' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      // FRONTEND ENV: set NOTES_API_BASE in environment when running/building
      NOTES_API_BASE: process.env.NOTES_API_BASE || 'http://localhost:3001',
    }
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
      "/api/**": {
        proxy: process.env.NOTES_API_BASE ? `${process.env.NOTES_API_BASE}/**` : undefined
      }
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
