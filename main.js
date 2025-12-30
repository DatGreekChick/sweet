import { createRoot } from 'react-dom/client'

import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { ThemeProvider } from 'styled-components'

import { App } from './client/App'
import { GlobalStyle } from './client/styles'

import { api } from './api'

function main() {
  const container = document.getElementById('main')
  const root = createRoot(container)

  root.render(
    <ApiProvider api={api}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.ENTERPRISE_RECAPTCHA_SITE_KEY}
        useEnterprise
      >
        <ThemeProvider theme={{ fontFamily: 'Open Sans, sans-serif' }}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </GoogleReCaptchaProvider>
    </ApiProvider>
  )
}

main()
