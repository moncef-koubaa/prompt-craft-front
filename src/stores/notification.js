// stores/notifications.js
import { defineStore } from 'pinia'
import { ref, computed, watch, onUnmounted } from 'vue'
import { EventSourcePolyfill } from 'event-source-polyfill'

export const useNotificationStore = defineStore('notifications', () => {
    const notifications = ref([])
    const error = ref(null)
    const isConnected = ref(false)
    const eventSource = ref(null)
    const reconnectAttempts = ref(0)
    const maxReconnectAttempts = 5
    let notificationCount= ref(0)
    const reconnectDelay = computed(() =>
        Math.min(1000 * Math.pow(2, reconnectAttempts.value), 30000
        )); // Exponential backoff with max 30s

    // Reactive token (updates when localStorage changes)
    const token = computed(() => localStorage.getItem('token'))

    // Getters
    const unreadCount = computed(() =>
        notifications.value.filter(n => !n.read).length
    )

    // SSE connection management
    function connectSSE() {
        disconnectSSE()
        if (!token.value) {
            error.value = new Error('Authentication token not found')
            return
        }

        try {
            const baseUrl = process.env.VUE_APP_NOTIFICATION_API;
            eventSource.value = new EventSourcePolyfill(
                baseUrl+'/sse/getNotified',
                {
                    headers: {
                        Authorization: `Bearer ${token.value}`
                    },
                    withCredentials: true
                }
            );


            // Connection established
            eventSource.value.onopen = () => {
                isConnected.value = true
                error.value = null
                reconnectAttempts.value = 0
                console.log('SSE connection established')
            }

            // Message received
            eventSource.value.onmessage = (event) => {
                notificationCount.value++;
                console.log('New notification received');
                try {
                    const newNotification = JSON.parse(event.data)
                    notifications.value.unshift({
                        ...newNotification,
                        read: false,
                        timestamp: new Date()
                    })
                } catch (parseError) {
                    handleError(new Error('Failed to parse notification data'))
                }
            }

            // Error handling
            eventSource.value.onerror = (err) => {
                handleError(err)
                attemptReconnect()
            }

        } catch (setupError) {
            handleError(setupError)
        }
    }

    function disconnectSSE() {
        clearNotifications();
        if (eventSource.value) {
            eventSource.value.close()
            eventSource.value = null
            isConnected.value = false
            console.log('SSE connection closed')
        }
    }

    function handleError(err) {
        error.value = err
        isConnected.value = false
        console.error('SSE Error:', err)
    }

    function attemptReconnect() {
        if (reconnectAttempts.value < maxReconnectAttempts) {
            reconnectAttempts.value++
            setTimeout(() => connectSSE(), reconnectDelay.value)
        } else {
            error.value = new Error('Max reconnect attempts reached')
        }
    }

    function markAsRead(id) {
        const notification = notifications.value.find(n => n.id === id)
        if (notification) notification.read = true
    }

    function markAllAsRead() {
        notifications.value.forEach(n => n.read = true)
    }

    function clearNotifications() {
        notificationCount.value = 0;
        notifications.value = []
    }

    // Auto-connect when token changes
    const tokenWatcher = watch(token, (newToken) => {
        if (newToken) {
            connectSSE()
        } else {
            disconnectSSE()
            error.value = new Error('Authentication token missing')
        }
    }, { immediate: true })

    // Cleanup
    onUnmounted(() => {
        tokenWatcher() // Stop watching token changes
        clearNotifications()
        disconnectSSE()
    })

    return {
        // State
        notifications,
        error,
        isConnected,

        // Getters
        unreadCount,

        // Actions
        connectSSE,
        disconnectSSE,
        markAsRead,
        markAllAsRead,
        clearNotifications,

        notificationCount,
    }
})