import { api } from './base'

const GITHUB_API_URL = 'https://api.github.com'
const GITHUB_ISSUES_URL = `${GITHUB_API_URL}/repos/YourGitHubUsername/your-repo/issues`

const handleGitHub = async (url, method, body = null) => {
  try {
    const options = {
      method,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
      },
      body: body ? JSON.stringify(body) : null,
    }

    const response = await fetch(url, options)
    const data = response.json()
    return { data }
  } catch (error) {
    return { error }
  }
}

export const gitHubApi = api.injectEndpoints({
  endpoints: build => ({
    fetchGitHubIssues: build.query({
      queryFn: () => handleGitHub(GITHUB_ISSUES_URL, 'GET'),
    }),
    updateGitHubIssue: build.mutation({
      queryFn: ({ id, patch }) =>
        handleGitHub(`${GITHUB_ISSUES_URL}/${id}`, 'PATCH', patch),
    }),
    createGitHubIssue: build.mutation({
      queryFn: body => handleGitHub(GITHUB_ISSUES_URL, 'POST', body),
    }),
  }),
})

export const {
  useFetchGitHubIssuesQuery,
  useUpdateGitHubIssueMutation,
  useCreateGitHubIssueMutation,
} = gitHubApi
