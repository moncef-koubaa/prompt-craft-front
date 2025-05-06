<template>
  <div class="flex space-x-1">
    <div
      v-for="dot in 3"
      :key="dot"
      :style="{ animationDelay: `${(dot - 1) * 0.2}s` }"
      class="w-1 h-1 bg-current rounded-full animate-loading-dot"
    ></div>
  </div>
</template>

<style scoped>
.animate-loading-dot {
  animation: loadingDot 0.8s infinite ease-in-out;
}

@keyframes loadingDot {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-3px);
    opacity: 1;
  }
}
</style>
