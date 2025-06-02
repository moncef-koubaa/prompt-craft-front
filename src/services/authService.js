import apiClientUnAuth from './API/not-authenticated';
import apiClientAuth from './API/authenticated';

const authService = {
    signUp: async (userData) => {
        try {
            await apiClientUnAuth.post('/auth/signup', userData);
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await apiClientUnAuth.post('/auth/login', credentials);
            const { access_token } = response.data;

            if (access_token) {
                localStorage.setItem('token', access_token);
            }

            return access_token;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    getMe: async () => {
        try {
            const response = await apiClientAuth.get('/auth/me');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            throw error;
        }
    },

    logout: () => {
        console.log('Logout');
        localStorage.removeItem('token');
    }
};

export default authService;
