import { resolve } from 'path'

const __dirname = resolve()
const isProd = process.env.NODE_ENV === 'production'

const getEnvVar = key => {
  const value = process.env[key]
  if (!value) {
    console.warn(`⚠️ Warning: Environment variable ${key} is not set`)
    return ''
  }
  return value
}

await Bun.build({
  entrypoints: ['./main.js'],
  outdir: `${__dirname}/public`,
  outbase: __dirname,
  format: 'esm',
  target: 'browser',
  splitting: false,
  minify: isProd,
  sourcemap: isProd ? 'none' : 'inline',
  publicPath: '/',
  watch: !isProd,
  incremental: !isProd,
  jsx: {
    runtime: 'automatic',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      isProd ? 'production' : 'development'
    ),
    'process.env.FIREBASE_API_KEY': JSON.stringify(
      getEnvVar('FIREBASE_API_KEY')
    ),
    'process.env.FIREBASE_APP_ID': JSON.stringify(getEnvVar('FIREBASE_APP_ID')),
    'process.env.FIREBASE_DATABASE_URL': JSON.stringify(
      getEnvVar('FIREBASE_DATABASE_URL')
    ),
    'process.env.FIREBASE_PROJECT_ID': JSON.stringify(
      getEnvVar('FIREBASE_PROJECT_ID')
    ),
    'process.env.GITHUB_API_TOKEN': JSON.stringify(
      getEnvVar('GITHUB_API_TOKEN')
    ),
    'process.env.RECAPTCHA_SITE_KEY': JSON.stringify(
      getEnvVar('RECAPTCHA_SITE_KEY')
    ),
    'process.env.ENTERPRISE_RECAPTCHA_SITE_KEY': JSON.stringify(
      getEnvVar('ENTERPRISE_RECAPTCHA_SITE_KEY')
    ),
    'process.env.APP_CHECK_DEBUG_TOKEN': JSON.stringify(
      getEnvVar('APP_CHECK_DEBUG_TOKEN')
    ),
    'process.env': JSON.stringify({
      NODE_ENV: isProd ? 'production' : 'development',
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN,
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
      ENTERPRISE_RECAPTCHA_SITE_KEY: process.env.ENTERPRISE_RECAPTCHA_SITE_KEY,
      APP_CHECK_DEBUG_TOKEN: process.env.APP_CHECK_DEBUG_TOKEN,
    }),
    process: JSON.stringify({
      env: {
        NODE_ENV: isProd ? 'production' : 'development',
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN,
        RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
        ENTERPRISE_RECAPTCHA_SITE_KEY:
          process.env.ENTERPRISE_RECAPTCHA_SITE_KEY,
        APP_CHECK_DEBUG_TOKEN: process.env.APP_CHECK_DEBUG_TOKEN,
      },
    }),
  },
  loader: {
    '.js': 'jsx',
    '.jsx': 'jsx',
    '.css': 'css',
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.txt': 'text',
    '.md': 'text',
    '.markdown': 'text',
  },
})

if (!isProd) {
  await new Promise(() => {})
}
