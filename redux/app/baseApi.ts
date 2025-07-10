import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

type ErrorGlobal = {
  message: string;
  statusCode: number;
  data: any;
};

export interface SuccessResponse<DataType = any> {
  message: string;
  statusCode: number;
  data: DataType;
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "https://backtest.somion.ch/api/admin/auth",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  const method = (args as FetchArgs).method || "GET";

  if (result.error) {
    const error = result.error as FetchBaseQueryError;
    const customError = error.data as ErrorGlobal;
    if (customError?.message) toast.error(customError.message);
  } else if (method !== "GET") {
    const data = result.data as SuccessResponse;
    toast.success(data.message);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["user"],
});
