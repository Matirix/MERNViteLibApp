import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OLBook } from '../utils/LibHooks';

interface FavouriteItem {
    title: string;
    olid: string; 
    imageUri: string;
    details: OLBook;
}
// Same as the other one
interface FavouritesState {
    items: FavouriteItem[];
}

const initialState: FavouritesState = {
    //@ts-ignore
    items: localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [],
};

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<FavouriteItem>) {
            state.items.push(action.payload);
            localStorage.setItem('favourites', JSON.stringify(state.items));
        },
        removeFavourite(state, action: PayloadAction<string>) {

            state.items = state.items.filter(item => item.olid !== action.payload);
            localStorage.setItem('favourites', JSON.stringify(state.items));
        }
    }
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
