import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingIndex = state.items.findIndex((item) => item.name === name);
        if (existingIndex >= 0) {
            return {
                ...state,
                items: [
                    ...state.items.slice(0, existingIndex),
                    {
                        ...state.items[existingIndex],
                        quantity: state.items[existingIndex] + 1,
                    },
                    ...state.items.slice(existingIndex + 1, state.items.length),
                ],
            };
        }

        return {
            ...state,
            items: [
                ...state.items,
                {
                    name,
                    image,
                    cost,
                    quantity: 1,
                },
            ],
        };
    },
    removeItem: (state, action) => {
        const { name } = action.payload;
        const existingIndex = state.items.findIndex((item) => item.name === name);
        if (existingIndex === -1) {
            return state;
        }

        return {
            ...state,
            items: [
                ...state.items.slice(0, existingIndex),
                ...state.items.slice(existingIndex + 1),
            ],
        };
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        if (quantity <= 0) {
            return removeItem({ name });
        }

        const existingIndex = state.items.findIndex((item) => item.name === name);
        if (existingIndex === -1) {
            return state;
        }

        return {
            ...state,
            items: [
                ...state.items.slice(0, existingIndex),
                {
                    ...state.items[existingIndex],
                    quantity,
                },
                ...state.items.slice(existingIndex + 1, state.items.length),
            ],
        };
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
