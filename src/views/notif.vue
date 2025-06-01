<script>
export default {
  data() {
    return {
      notifications: [
        { id: 1, title: "New Message", message: "You have received a new message from John", read: false },
        { id: 2, title: "System Update", message: "System maintenance scheduled for tonight", read: false },
        { id: 3, title: "Payment Received", message: "Your payment of $99 has been processed", read: false },
        { id: 4, title: "Welcome!", message: "Welcome to our platform", read: false },
        { id: 5, title: "Security Alert", message: "New login detected from Chrome browser", read: false },
      ],
      slidingOut: null
    }
  },
  methods: {
    markAsRead(id) {
      this.slidingOut = id;

      // Remove the notification after the animation completes
      setTimeout(() => {
        this.notifications = this.notifications.filter(notification => notification.id !== id);
        this.slidingOut = null;
      }, 500); // Match the animation duration
    },
    addSampleNotifications() {
      this.notifications = [
        {
          id: Date.now() + 1,
          title: "New Message",
          message: "You have received a new message from John",
          read: false,
        },
        {
          id: Date.now() + 2,
          title: "System Update",
          message: "System maintenance scheduled for tonight",
          read: false,
        },
        {
          id: Date.now() + 3,
          title: "Payment Received",
          message: "Your payment of $99 has been processed",
          read: false,
        },
      ];
    },
    isNotificationSlidingOut(id) {
      return this.slidingOut === id;
    }
  },
  computed: {
    notificationText() {
      return `${this.notifications.length} unread notification${this.notifications.length !== 1 ? 's' : ''}`;
    }
  }
}
</script>

<template>
  <div class="w-full max-w-md mx-auto p-4 space-y-3">
    <h2 class="text-xl font-semibold mb-4">Notifications</h2>

    <div class="text-sm text-gray-500 mb-4">
      {{ notificationText }}
    </div>

    <transition-group
        name="notification-list"
        tag="div"
        class="space-y-3"
    >
      <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ 'sliding-out': isNotificationSlidingOut(notification.id) }"
      >
        <div class="bg-white border border-blue-200 rounded-lg hover:shadow-md transition-shadow duration-200 p-4">
          <div class="flex items-start gap-3">
            <!-- Arrow Button -->
            <button
                @click="markAsRead(notification.id)"
                :disabled="isNotificationSlidingOut(notification.id)"
                class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200 disabled:opacity-50"
            >
              <transition name="icon" mode="out-in">
                <div v-if="isNotificationSlidingOut(notification.id)" key="check" class="check-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-green-600">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div v-else key="arrow" class="arrow-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </transition>
            </button>

            <!-- Notification Content -->
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-sm text-gray-900">{{ notification.title }}</h3>
              <p class="text-sm mt-1 text-gray-600">{{ notification.message }}</p>

              <!-- "Marking as read" indicator -->
              <transition name="fade">
                <div
                    v-if="isNotificationSlidingOut(notification.id)"
                    class="mt-2 text-xs text-green-600 font-medium"
                >
                  ✓ Marking as read...
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </transition-group>


  </div>
</template>

<style scoped>
/* Notification list transitions */
.notification-list-enter-active,
.notification-list-leave-active {
  transition: all 0.5s ease;
}

.notification-list-enter-from {
  opacity: 0;
  transform: translateX(-50px) scale(0.9);
}

.notification-list-leave-to {
  opacity: 0;
  transform: translateX(300px) scale(0.8);
}

.notification-list-move {
  transition: transform 0.5s ease;
}

/* Sliding out state */
.sliding-out {
  pointer-events: none;
  opacity: 0;
  transform: translateX(300px) scale(0.8);
  transition: all 0.5s ease-in-out;
}

/* Icon transitions */
.icon-enter-active,
.icon-leave-active {
  transition: all 0.2s ease;
}

.icon-enter-from {
  opacity: 0;
  transform: scale(0) rotate(-90deg);
}

.icon-leave-to {
  opacity: 0;
  transform: scale(0) rotate(90deg);
}

/* Arrow hover effect */
.arrow-icon {
  transition: transform 0.2s ease;
}

button:hover .arrow-icon {
  transform: translateX(2px);
}

/* Check icon animation */
.check-icon {
  animation: check-pulse 0.2s ease;
}

@keyframes check-pulse {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>