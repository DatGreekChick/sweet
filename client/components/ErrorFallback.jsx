import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { styled } from 'styled-components'

import {
  useCreateGitHubIssueMutation,
  useFetchGitHubIssuesQuery,
  useUpdateGitHubIssueMutation,
} from '../../api'

const StyledError = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  // skip fetching GitHub data or producing issues when in development
  const skip = process.env.NODE_ENV === 'development'

  const location = useLocation()
  const navigated = useRef(false)

  const { data, isLoading, isError } = useFetchGitHubIssuesQuery(undefined, {
    skip,
  })
  const [createGitHubIssue] = useCreateGitHubIssueMutation()
  const [updateGitHubIssue] = useUpdateGitHubIssueMutation()

  useEffect(() => {
    if (skip || isLoading || isError) return

    const formattedStack = `### Error occurred at \`${location.pathname}\` on: ${new Date()}\n\`\`\`console\n${error.stack}\n\`\`\``

    // search for any existing GitHub issues with the error.message title
    // if issues exist, update all of them, otherwise create a new issue
    const foundIssues = data?.filter(issue => issue.title === error.message)
    if (foundIssues?.length > 0) {
      foundIssues.forEach(issue =>
        updateGitHubIssue({
          id: issue.number,
          patch: { body: `${issue.body}\n${formattedStack}` },
        })
      )
    } else {
      createGitHubIssue({
        title: error.message,
        body: formattedStack,
        labels: ['bug'],
      })
    }
  }, [
    error,
    data,
    location.pathname,
    isLoading,
    isError,
    createGitHubIssue,
    updateGitHubIssue,
  ])

  useEffect(() => {
    navigated.current ? resetErrorBoundary() : (navigated.current = true)
  }, [location, resetErrorBoundary])

  return (
    <StyledError>
      <h2>Uh oh! Something went wrong 🫠</h2>
      <pre style={{ color: 'red' }}>Error: {error.message}</pre>
      <p>Please click the button to try again or navigate to another route.</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </StyledError>
  )
}
