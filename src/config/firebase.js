// This is a mock configuration for development
export const firebaseConfig = {
    apiKey: "mock-api-key",
    authDomain: "mock-project.firebaseapp.com",
    projectId: "mock-project",
    storageBucket: "mock-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Mock Firebase auth state
export const mockFirebaseAuth = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
        // Simulate auth state change
        return () => { }; // Cleanup function
    },
    signOut: async () => {
        // Simulate sign out
        return Promise.resolve();
    }
};
