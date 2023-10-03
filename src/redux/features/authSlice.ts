import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
};

const initialState = {
  value: {
    isAuth: false,
  } as AuthState,
} as InitialState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<boolean>) => {
      console.log("Reducer hit", action);
      return {
        value: {
          isAuth: action.payload,
        },
      };
    },
  },
});

export const { logIn } = authSlice.actions;

export default authSlice.reducer;
