import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock users data
const MOCK_USERS = [
    {
        id: '1',
        email: 'john.doe@university.edu',
        password: 'Password123!',
        verified: true,
    },
    {
        id: '2',
        email: 'jane.smith@college.ac.uk',
        password: 'Password456!',
        verified: true,
    },
];

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

class MockAuthService {
    constructor() {
        this.sessionTimer = null;
        this.initialize();
    }

    async initialize() {
        try {
            // Check for existing session
            const session = await AsyncStorage.getItem('session');
            if (session) {
                const { user, timestamp } = JSON.parse(session);
                const now = Date.now();
                if (now - timestamp < SESSION_DURATION) {
                    this.startSessionTimer();
                    return user;
                } else {
                    await this.logout();
                }
            }
        } catch (error) {
            console.error('Session initialization error:', error);
        }
        return null;
    }

    validateEmail(email) {
        const eduRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu|ac\.[a-zA-Z]{2,})$/;
        return eduRegex.test(email);
    }

    async login(email, password) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

        const user = MOCK_USERS.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        if (!user.verified) {
            throw new Error('Please verify your email first');
        }

        await this.startSession(user);
        return user;
    }

    async startSession(user) {
        const session = {
            user,
            timestamp: Date.now(),
        };
        await AsyncStorage.setItem('session', JSON.stringify(session));
        this.startSessionTimer();
    }

    startSessionTimer() {
        if (this.sessionTimer) {
            clearTimeout(this.sessionTimer);
        }
        this.sessionTimer = setTimeout(() => this.logout(), SESSION_DURATION);
    }

    async logout() {
        try {
            await AsyncStorage.removeItem('session');
            if (this.sessionTimer) {
                clearTimeout(this.sessionTimer);
                this.sessionTimer = null;
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    async checkSession() {
        try {
            const session = await AsyncStorage.getItem('session');
            if (session) {
                const { user, timestamp } = JSON.parse(session);
                const now = Date.now();
                if (now - timestamp < SESSION_DURATION) {
                    return user;
                }
                await this.logout();
            }
        } catch (error) {
            console.error('Check session error:', error);
        }
        return null;
    }
}

export default new MockAuthService();