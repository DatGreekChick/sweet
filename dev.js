/**
 * Run `firebase serve` and Bun's build watcher together, to get
 * firebase routes and function emulation.
 */

import { spawn } from 'child_process'
import open from 'open'
import pc from 'picocolors'

const FIREBASE_PORT = 8080
const LOCAL_SERVER_REGEX = /(?:Local server|Server listening): (.*)/

// Start Bun build watcher
startProcess('🤖 bun build', 'bun', ['run', 'build'])

// Start Firebase serve and open browser when ready
const firebase = startProcess('🔥 firebase', 'bunx', [
  'firebase',
  'serve',
  '--only',
  'hosting',
  '--port',
  FIREBASE_PORT,
])

// Watch for server URL and open browser
firebase.stdout.on('data', data => {
  const match = data.toString().match(LOCAL_SERVER_REGEX)
  if (match) {
    const url = match[1].trim()
    console.log(pc.green(`\n🚀 Dev server running at ${url}\n`))
    open(url, { app: { name: 'chrome' } })
  }
})

function startProcess(label, command, args) {
  const child = spawn(command, args, {
    env: { ...process.env, FORCE_COLOR: '3' },
    stdio: ['inherit', 'pipe', 'pipe'],
  })

  const prefix = pc.cyan(`[${label}]\t`)

  child.stdout.on('data', data => {
    process.stdout.write(prefix + data.toString())
  })

  child.stderr.on('data', data => {
    process.stderr.write(prefix + data.toString())
  })

  child.on('exit', code => {
    if (code !== 0) {
      console.error(pc.red(`\n${label} exited with code ${code}`))
      process.exit(code)
    }
  })

  return child
}
