import { Basket } from "../../app/models/basket";
import { createSlice } from "@reduxjs/toolkit";

interface BasketState {
    basket: Basket | null
}

const initialState : BasketState = {
    basket:  null
}

export const basketSlice =  createSlice({
    name : "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        removeItem: (state, action) => {
            const {productId, quantity} = action.payload;
            const itemIndex = state.basket?.itemDtos.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.itemDtos[itemIndex].quantity -= quantity;
            if(state.basket?.itemDtos[itemIndex].quantity === 0)
                state.basket.itemDtos.splice(itemIndex, 1);
        }
    }
})

export const {setBasket, removeItem} = basketSlice.actions;