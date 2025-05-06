<!-- components/LoadingAnimation.vue -->
<template>
  <div class="flex items-center justify-center">
    <div class="w-6 h-6 rounded-full bg-primary/50 animate-pulse"></div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>

<!-- components/LoadingDots.vue -->
