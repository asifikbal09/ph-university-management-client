import { TAcademicFaculty } from "../../../types/academicFaculty.type";
import {
  TAcademicSemester,
  TQueryParams,
} from "../../../types/academicSemester.type";
import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAllFaculties: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useGetAllFacultiesQuery
} = academicManagementApi;
