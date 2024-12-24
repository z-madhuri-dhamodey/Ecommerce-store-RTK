import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


/*Channel name is Coder's Gyan, to understand the below code(Object.freeze) watch 1:05:30
 https://www.youtube.com/watch?v=XwGNhppX4as

 Object.freeze = means all the properties and values are freeze or we can say read only, from outside it is not changeable.*/

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        /* const res = await fetch('https://fakestoreapi.com/products') = Never use asynchronous operations in reducers because reducers are pure functions. Instead, use thunks in Redux Toolkit for handling asynchronous tasks.

        Why?
        Reducers are pure functions: They should only take the current state and an action, then return the new state. No side effects like API calls or delays.
        Thunks: The word 'Thunks' is a programming term that means 'a piece of code that does some delayed work', Thunks are special functions that let you handle asynchronous operations (e.g., fetching data) outside the reducer. After the async work is done, they dispatch actions to update the state.
        */
        

        // setProducts(state, action) {
        //     state.data = action.payload;
        // },
        // setStatus(state, action) {
        //     state.status = action.payload;
        // },
    },


    /*Channel name is Coder's Gyan, to understand the below code(Object.freeze) watch 1:30:00 (The link is located above)*/
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});

// export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Thunks
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
});

// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     };
// }
