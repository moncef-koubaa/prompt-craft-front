import axios from 'axios';

const API_BASE = 'http://localhost:3002/notification';


function getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

export const notificationService = {
    async getUnreadNotifications() {
        const res = await axios.get(`${API_BASE}/unread`, getAuthHeaders());
        return res.data;
    },

    async markNotificationAsRead(id) {
        await axios.put(`${API_BASE}/mark-read/${id}`, {}, getAuthHeaders());
    },

    async markAllNotificationsAsRead() {
        await axios.put(`${API_BASE}/mark-all-read`, {}, getAuthHeaders());
    }
};
