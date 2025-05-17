<!-- PhotoGenerator.vue -->
<script>
import { Send, ImageIcon } from "lucide-vue-next";
import SidebarMenu from "../components/SidebarMenu.vue";
import Button from "../components/ui/Button.vue";
import Input from "../components/ui/Input.vue";
import LoadingAnimation from "../components/LoadingAnimation.vue";
import LoadingDots from "../components/LoadingDots.vue";
import EmptyState from "../components/EmptyState.vue";
import ChatBotService from "@/services/chat-bot.service";

export default {
  components: {
    SidebarMenu,
    Button,
    Input,
    LoadingAnimation,
    LoadingDots,
    EmptyState,
    Send,
    ImageIcon,
  },

  data() {
    return {
      input: "",
      messages: [],
      isLoading: false,
      isGenerating: false,
      isSidebarOpen: false,
    };
  },

  computed: {
    userPrompts() {
      return this.messages
        .filter((message) => message.role === "user")
        .map((message) => message.content);
    },
  },

  methods: {
    async generateImage() {
      if (!this.input.trim() || this.isLoading || this.isGenerating) return;

      // Add user message
      this.messages.push({
        role: "user",
        content: this.input,
      });

      // Start generating
      this.isGenerating = true;
      this.isLoading = true;

      try {
        const data = await ChatBotService.getChatBotResponse(this.input);

        this.messages.push({
          role: "assistant",
          content: data.url || "data:image/png;base64,yourImageDataHere",
        });
        console.log("Generated image URL:", response.data.url);
      } catch (error) {
        console.error("Error generating image:", error);
        this.messages.push({
          role: "assistant",
          content: "Sorry, there was an error generating your image.",
        });
      } finally {
        this.isGenerating = false;
        this.isLoading = false;
        this.input = "";
      }
    },

    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },

    clearHistory() {
      this.messages = [];
    },
    saveImage(imageUrl) {
      console.log("Image URL saved:", imageUrl);
    },
  },
};
</script>

<template>
  <div class="flex h-screen bg-background">
    <!-- Sidebar -->
    <SidebarMenu
      :is-open="isSidebarOpen"
      :prompts="userPrompts"
      @clear-history="clearHistory"
    />

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <header class="border-b p-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Button @click="toggleSidebar" variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>
          <h1 class="text-xl font-bold">NFT Generator</h1>
        </div>
        <Button variant="ghost" size="icon">
          <ImageIcon class="h-5 w-5" />
        </Button>
      </header>

      <div class="flex-1 overflow-auto p-4">
        <transition-group name="message-fade" tag="div" class="space-y-8 pb-20">
          <template v-if="messages.length === 0">
            <EmptyState />
          </template>
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="[
              'flex flex-col max-w-3xl mx-auto',
              message.role === 'user' ? 'items-end' : 'items-start',
            ]"
          >
            <div
              :class="[
                'rounded-lg p-3',
                // message.role === 'user'
                //   ? 'bg-primary text-primary-foreground'
                'bg-muted',
              ]"
            >
              <p v-if="message.role === 'user'">
                {{ message.content }}
              </p>
              <div v-else class="relative">
                <img
                  :src="message.content"
                  alt="Generated image"
                  class="rounded-md max-w-full max-h-[500px] object-contain"
                />
                <div class="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    class="h-8"
                    @Click="saveImage(message.content)"
                  >
                    <ImageIcon class="h-4 w-4 mr-2" />
                    Choose this image
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="isGenerating"
            class="flex flex-col items-start max-w-3xl mx-auto"
          >
            <div class="bg-muted rounded-lg p-4 flex items-center gap-2">
              <LoadingAnimation />
              <p>Generating your image...</p>
            </div>
            <span class="text-xs text-muted-foreground mt-1">AI</span>
          </div>
        </transition-group>
      </div>

      <div class="border-t p-4">
        <form
          @submit.prevent="generateImage"
          class="flex gap-2 max-w-3xl mx-auto"
        >
          <Input
            v-model="input"
            placeholder="Describe the NFT you want to generate..."
            class="flex-1"
            :disabled="isLoading || isGenerating"
          />
          <Button
            variant="secondary"
            type="submit"
            :disabled="isLoading || isGenerating || !input.trim()"
          >
            <template v-if="isGenerating">
              <span class="flex items-center gap-2">
                <LoadingDots />
                Generating
              </span>
            </template>
            <template v-else>
              <span class="flex items-center gap-2">
                <Send class="h-4 w-4" />
                Generate
              </span>
            </template>
          </Button>
        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
.message-fade-enter-active,
.message-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
