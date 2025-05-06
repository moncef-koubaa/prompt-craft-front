<!-- components/EmptyState.vue -->
<script setup>
import { ref } from "vue";
import { Sparkles } from "lucide-vue-next";

const examples = ref([
  "A serene lake at sunset with mountains in the background",
  "A futuristic cityscape with flying cars and neon lights",
  "A magical forest with glowing mushrooms and fairy lights",
]);
</script>

<template>
  <div
    class="h-full flex flex-col items-center justify-center text-center p-8 animate-fade-in"
  >
    <div
      class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
    >
      <Sparkles class="h-10 w-10 text-primary" />
    </div>
    <h2 class="text-2xl font-bold mb-2">Create amazing NFTs</h2>
    <p class="text-muted-foreground max-w-md mb-8">
      Describe what you want to see, and our AI will generate it for you. Be as
      detailed as possible for the best results.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
      <div
        v-for="(example, index) in examples"
        :key="index"
        :style="{ animationDelay: `${index * 0.1}s` }"
        class="bg-muted p-4 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors animate-fade-in-up"
      >
        <p class="text-sm">{{ example }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-in-out both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
