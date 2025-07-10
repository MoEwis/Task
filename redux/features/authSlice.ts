import { TOKEN, TYPE } from "@/constants";
import { IAuthState } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

const initialState: IAuthState = {
  token: (getCookie(TOKEN) as string) || null,
  type: (getCookie(TYPE) as "admin" | "employee") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IAuthState>) => {
      state.type = action.payload.type;
      state.token = action.payload.token;

      setCookie(TOKEN, action.payload.token, {
        maxAge: 60 * 60 * 24 * 7,
      });

      setCookie(TYPE, JSON.stringify(action.payload.type), {
        maxAge: 60 * 60 * 24 * 7,
      });
    },
    logout: (state) => {
      state.type = null;
      state.token = null;

      deleteCookie(TYPE);
      deleteCookie(TOKEN);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
