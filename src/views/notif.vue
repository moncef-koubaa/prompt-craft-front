<script setup>
import { useNotificationStore } from '@/stores/notification';
import { storeToRefs } from 'pinia'
import { onUnmounted } from 'vue'

const notificationStore = useNotificationStore()
const { notifications, unreadCount, isConnected, error } = storeToRefs(notificationStore)

onUnmounted(() => {
  notificationStore.disconnectSSE()
})
</script>

<template>
  hiii
  <div class="notifications-container">
    <div v-if="error" class="error-alert">
      {{ error.message }}
      <button @click="notificationStore.connectSSE">Retry</button>
    </div>

    <div v-else-if="!isConnected" class="connection-status">
      Connecting to notifications...
    </div>

    <div class="notifications-list">
      <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="['notification-item', { unread: !notification.read }]"
          @click="notificationStore.markAsRead(notification.id)"
      >
        <div class="notification-content">
          {{ notification.userId}},
          {{ notification.message }}
        </div>
        <div class="notification-time">
          {{ notification.timestamp.toLocaleTimeString() }}
        </div>
      </div>
    </div>

    <div class="notification-actions">
      <button @click="notificationStore.markAllAsRead">
        Mark All Read
      </button>
      <button @click="notificationStore.clearNotifications">
        Clear All
      </button>
    </div>

    <div v-if="unreadCount > 0" class="unread-badge">
      {{ unreadCount }} unread
    </div>
  </div>
</template>