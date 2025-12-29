import { api } from './base'
import { fetchData } from '../firebase-app'

export const firebaseApi = api.injectEndpoints({
  endpoints: build => ({
    fetchData: build.query({
      queryFn: () => fetchData('firebase-document-name'),
    }),
  }),
})

export const {
  useFetchProjectsQuery,
  useFetchArticlesQuery,
  useFetchUsesQuery,
} = firebaseApi
