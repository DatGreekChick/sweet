import { initializeApp } from 'firebase/app'
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from 'firebase/app-check'

self.FIREBASE_APPCHECK_DEBUG_TOKEN =
  process.env.NODE_ENV === 'development'
    ? process.env.APP_CHECK_DEBUG_TOKEN
    : false

const recaptchaToken =
  process.env.NODE_ENV === 'development'
    ? self.FIREBASE_APPCHECK_DEBUG_TOKEN
    : process.env.ENTERPRISE_RECAPTCHA_SITE_KEY

export const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
})

initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(recaptchaToken),
  isTokenAutoRefreshEnabled: true, // allow auto-refresh
})
