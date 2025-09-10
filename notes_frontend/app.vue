<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Root app - no logic needed here, pages handle content.
</script>

<style>
:root {
  --bg: #0f172a;
  --panel: #111827;
  --text: #e5e7eb;
  --muted: #9ca3af;
  --primary: #22d3ee;
  --danger: #ef4444;
  --success: #10b981;
}

html, body, #__nuxt {
  height: 100%;
}
body {
  background: var(--bg);
  color: var(--text);
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
  margin: 0;
}

a { color: var(--primary); text-decoration: none; }
button { cursor: pointer; }
input, textarea, select {
  background: #0b1020;
  border: 1px solid #1f2937;
  color: var(--text);
  border-radius: 8px;
  padding: 10px 12px;
}
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
}
.card {
  background: var(--panel);
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 16px;
}
.btn {
  background: #0ea5b1;
  border: none;
  color: #062329;
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 600;
}
.btn.secondary { background: #0b1020; color: var(--text); border: 1px solid #1f2937; }
.btn.danger { background: var(--danger); color: #fff; }
.btn.gray { background: #374151; color: #fff; }
.btn:disabled { opacity: .5; cursor: not-allowed; }
.field { display: grid; gap: 6px; margin-bottom: 12px; }
.label { color: var(--muted); font-size: 0.9rem; }
.error { color: var(--danger); }
.success { color: var(--success); }
.toolbar { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.spacer { flex: 1; }
h1, h2, h3 { margin: 0 0 12px 0; }
</style>
