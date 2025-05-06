<!-- components/SidebarMenu.vue -->
<script setup>
/* eslint-disable */
import { ImageIcon } from "lucide-vue-next";
import Button from "./ui/Button.vue";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  prompts: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["clearHistory"]);

const clearHistory = () => {
  emit("clearHistory");
};
</script>

<template>
  <aside
    :class="[
      'border-r bg-background transition-all duration-300',
      isOpen ? 'w-64' : 'w-0 overflow-hidden',
    ]"
  >
    <div class="flex flex-col h-full">
      <header class="border-b p-4">
        <h2 class="text-lg font-semibold px-2">Prompt History</h2>
      </header>

      <div class="flex-1 overflow-y-auto">
        <div v-if="prompts.length > 0" class="py-2">
          <div
            v-for="(prompt, index) in prompts"
            :key="index"
            class="flex items-center px-4 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer"
          >
            <ImageIcon class="h-4 w-4 mr-2" />
            <span class="text-sm truncate">
              {{
                prompt.length > 25 ? `${prompt.substring(0, 25)}...` : prompt
              }}
            </span>
          </div>
        </div>
        <div v-else class="p-4 text-center text-muted">
          <p class="text-base">No history yet</p>
          <p class="text-base mt-1">Your prompts will appear here</p>
        </div>
      </div>

      <footer class="border-t p-2">
        <Button @click="clearHistory" variant="outline" class="w-full">
          Clear History
        </Button>
      </footer>
    </div>
  </aside>
</template>
