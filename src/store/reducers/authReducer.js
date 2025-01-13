const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    theme: 'light',
    language: 'en',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_START':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'AUTH_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false,
                error: null,
            };
        case 'AUTH_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'AUTH_LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null,
            };
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload,
            };
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
