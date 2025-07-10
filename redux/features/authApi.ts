import { baseApi, SuccessResponse } from "@/redux/app/baseApi";
import { IAuthState, ILoginDTO } from "@/types/auth";
import { login, logout as logoutAction } from "./authSlice";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<SuccessResponse<IAuthState>, ILoginDTO>({
      query: (credentials) => {
        const formData = new FormData();
        formData.append("email", credentials.email);
        formData.append("password", credentials.password);

        return {
          url: "login",
          method: "POST",
          body: formData,
          headers: {
            lang: "en",
          },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data.data));
        } catch (error) {
          console.error(" Login failed:", error);
        }
      },
    }),

    profile: build.query<SuccessResponse<any>, void>({
      query: () => ({
        url: "profile",
        method: "GET",
        headers: {
          lang: "de",
          Accept: "application/json",
        },
      }),
      providesTags: ["user"],
    }),

    logout: build.mutation<SuccessResponse<any>, void>({
      query: () => ({
        url: "logout",
        method: "POST",
        headers: {
          lang: "de",
          Accept: "application/json",
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutAction());
        } catch (error) {
          console.error(" Logout failed:", error);
        }
      },
    }),
  }),

  overrideExisting: true,
});

export const { useLoginMutation, useProfileQuery, useLogoutMutation } = authApi;
