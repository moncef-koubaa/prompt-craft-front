<!-- components/ui/Button.vue -->
<script setup>
/* eslint-disable */
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "outline", "secondary", "ghost"].includes(value),
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["default", "sm", "lg", "icon"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const classes = computed(() => {
  return [
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    {
      "bg-primary text-primary-foreground hover:bg-primary/90":
        props.variant === "default",
      "border border-input hover:bg-accent hover:text-accent-foreground":
        props.variant === "outline",
      "bg-secondary text-secondary-foreground hover:bg-secondary/80":
        props.variant === "secondary",
      "hover:bg-accent hover:text-accent-foreground": props.variant === "ghost",
      "h-10 py-2 px-4": props.size === "default",
      "h-9 px-3 rounded-md": props.size === "sm",
      "h-11 px-8 rounded-md": props.size === "lg",
      "h-10 w-10 p-0": props.size === "icon",
    },
  ];
});
</script>

<template>
  <button :class="classes" :disabled="disabled">
    <slot></slot>
  </button>
</template>
