import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    total: 0,
    subtotal: 0,
    tax: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity = 1 } = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            if (existingItem) {
                const newQuantity = Math.min(existingItem.quantity + quantity, 5);
                existingItem.quantity = newQuantity;
            } else {
                state.items.push({ ...product, quantity });
            }

            // Recalculate totals
            state.subtotal = state.items.reduce(
                (sum, item) => sum + (item.studentPrice || item.price) * item.quantity,
                0
            );
            state.tax = state.subtotal * 0.08; // 8% tax
            state.total = state.subtotal + state.tax;
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);

            // Recalculate totals
            state.subtotal = state.items.reduce(
                (sum, item) => sum + (item.studentPrice || item.price) * item.quantity,
                0
            );
            state.tax = state.subtotal * 0.08;
            state.total = state.subtotal + state.tax;
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item) {
                item.quantity = Math.min(Math.max(1, quantity), 5);

                // Recalculate totals
                state.subtotal = state.items.reduce(
                    (sum, item) => sum + (item.studentPrice || item.price) * item.quantity,
                    0
                );
                state.tax = state.subtotal * 0.08;
                state.total = state.subtotal + state.tax;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            state.subtotal = 0;
            state.tax = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
