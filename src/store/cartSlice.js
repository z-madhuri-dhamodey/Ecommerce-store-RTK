import { createSlice } from '@reduxjs/toolkit'

//In simple way -createSlice means dividing the store into smaller pieces or diff store for diff purpose for cleaner code.

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload); //filter() function always return True value, means if have to remove 4 id, it will check if 1!=4 True so it will return id 1 product then check for 2,3 and 4, for 4!=4 False, so it will not return id 4 product, so expext 4 filter will return all the values which is true
        },
    },
});

export const { add, remove } = cartSlice.actions; //This is actions itself, createSlice will internally handle types and payloads attribute for actions.
export default cartSlice.reducer;
