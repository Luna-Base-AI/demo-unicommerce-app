import mockAuthService from '../../services/auth/mockAuthService';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'AUTH_START' });
        const user = await mockAuthService.login(email, password);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
        dispatch({ type: 'AUTH_FAIL', payload: error.message });
    }
};

export const register = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'AUTH_START' });
        const user = await mockAuthService.register(email, password);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
        dispatch({ type: 'AUTH_FAIL', payload: error.message });
    }
};

export const logout = () => async (dispatch) => {
    try {
        await mockAuthService.logout();
        dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
        console.error('Logout error:', error);
    }
};

export const resetPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: 'AUTH_START' });
        await mockAuthService.resetPassword(email);
        dispatch({ type: 'AUTH_SUCCESS', payload: null });
    } catch (error) {
        dispatch({ type: 'AUTH_FAIL', payload: error.message });
    }
};

export const setTheme = (theme) => ({
    type: 'SET_THEME',
    payload: theme,
});

export const setLanguage = (language) => ({
    type: 'SET_LANGUAGE',
    payload: language,
});
