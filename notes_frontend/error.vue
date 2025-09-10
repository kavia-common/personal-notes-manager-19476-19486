<template>
  <div class="card">
    <h2>Something went wrong</h2>
    <p class="label">{{ (error as any)?.message || 'Unknown error' }}</p>
    <div class="toolbar">
      <NuxtLink class="btn" to="/">Go Home</NuxtLink>
      <button class="btn secondary" @click="handleError">Dismiss</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const error = useError()
const handleError = () => clearError({ redirect: '/' })
</script>
