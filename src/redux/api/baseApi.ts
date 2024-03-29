import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "sonner";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (arg, api, extraOption): Promise<any> => {
  let result = await baseQuery(arg, api, extraOption);
  if (result.error?.status === 404) {
    const message = result.error.data.message 
    toast.error(message as string);
  }
  if (result.error?.status === 500) {
    toast.error(result.error.data.message);
  }
  if (result.error?.status === 401) {
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (data) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user: user,
          token: data.data.accessToken,
        })
      );
      result = await baseQuery(arg, api, extraOption);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
