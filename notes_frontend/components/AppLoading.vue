<template>
  <div v-show="pending" class="loading-bar" />
</template>

<script setup lang="ts">
const router = useRouter()
const pending = ref(false)

router.beforeEach(() => { pending.value = true })
router.afterEach(() => { pending.value = false })
</script>

<style scoped>
.loading-bar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #22d3ee, #10b981);
  animation: slide 1.1s infinite linear;
  z-index: 9999;
}
@keyframes slide {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(-30%); }
  100% { transform: translateX(100%); }
}
</style>
