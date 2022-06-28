import { createSlice } from "@reduxjs/toolkit";

// Tout ce qui est nécessaire pour le profil utilisateur (le récupérer, supprimer etc)
export const userSlice = createSlice({
    name: "user",
    initialState: {
        getUserValue: null,
        getUsersValue: null,
        getUserSignUpOrIn: null
    },
    reducers: {
        getUser: (state, action) => {
            state.getUserValue = action.payload;
        },
        getUsers: (state, action) => {
            state.getUsersValue = action.payload;
        },
        editUser: (state, action) => {
            state.getUserValue.forEach(user => {
                if (user.id === action.payload.id) {
                    user.pseudo = action.payload.pseudo;
                }
            })
            state.getUsersValue.forEach(user => {
                if (user.id === action.payload.id) {
                    user.pseudo = action.payload.pseudo;
                }
            })
        },
        // Supprimer un utilisateur en vérifiant l'id 
        deleteUser: (state, action) => {
            state.getUserValue = null;
            const arrayDelete = [];
            state.getUsersValue.forEach(user => {
                if (user.id !== action.payload) {
                    arrayDelete.push(user);
                }
            });
            state.getUsersValue = arrayDelete;
        },
        logUser: (state, action) => {
            state.getUserSignUpOrIn = action.payload;
        }
        
    }
});



export const { getUser, getUsers, editUser, deleteUser, logUser } = userSlice.actions;
export default userSlice.reducer;