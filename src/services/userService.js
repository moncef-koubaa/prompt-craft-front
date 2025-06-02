import apiClientAuth from "./API/authenticated";

const API_BASE = '/user';

const userService = {
    async getBalance() {
        const response = await apiClientAuth.get(`${API_BASE}/balance`);
        console.log("User balance response:", response);
        return response.data;
    },

    async makeAdmin(username) {
        const response = await apiClientAuth.patch(`${API_BASE}/make-admin`, null, {
            params: { username },
        });
        return response.data;
    },

    async revokeAdmin(username) {
        const response = await apiClientAuth.patch(`${API_BASE}/revoke-admin`, null, {
            params: { username },
        });
        return response.data;
    },

    async getUsername() {
        const response = await apiClientAuth.get(`${API_BASE}/username`);
        return response.data;
    },

    async getEmail() {
        const response = await apiClientAuth.get(`${API_BASE}/email`);
        return response.data;
    },

    async getOwnedNfts() {
        const response = await apiClientAuth.get(`${API_BASE}/owned-nfts`);
        return response.data;
    },
};

export default userService;
